import { ErrorCode } from '@/common/constants';
import { BusinessException } from '@/common/exceptions';
import { MailService } from '@/modules/common/mail/mail.service';
import { RedisService } from '@/modules/common/redis/redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationService {
  private readonly DAILY_LIMIT = 5; // 하루 최대 전송 횟수
  private readonly VERIFIED_EMAIL_PREFIX = 'verified_email:';

  constructor(
    private redisService: RedisService,
    private mailService: MailService,
  ) {}

  async sendVerificationCode(email: string): Promise<void> {
    const redis = this.redisService.getClient();
    const countKey = `verification:count:${email}`;

    // 오늘 사용한 횟수 확인
    const count = await redis.get(countKey);
    if (count && parseInt(count) >= this.DAILY_LIMIT) {
      throw new BusinessException(ErrorCode.COMMON.DAILY_LIMIT_EXCEEDED);
    }
    // 6자리 랜덤 코드 생성
    const code = Math.random().toString().substring(2, 8);

    // Redis에 저장 (5분 유효)
    await this.redisService
      .getClient()
      .set(`verification:${email}`, code, 'EX', 300);

    // 이메일 발송
    await this.mailService.sendVerificationCode(email, code);

    // 사용 횟수 증가
    if (!count) {
      // 처음 사용하는 경우 - 24시간 만료로 설정
      await redis.set(countKey, '1', 'EX', 24 * 60 * 60);
    } else {
      // 기존 만료 시간 유지하면서 카운트만 증가
      await redis.incr(countKey);
    }
  }

  async verifyEmail(email: string, code: string): Promise<boolean> {
    const redis = this.redisService.getClient();
    const savedCode = await this.redisService
      .getClient()
      .get(`verification:${email}`);

    if (!savedCode) {
      throw new BusinessException(ErrorCode.COMMON.INVALID_CODE);
    }

    if (savedCode !== code) {
      throw new BusinessException(ErrorCode.COMMON.INVALID_CODE);
    }

    // 인증 성공 처리
    await Promise.all([
      // 인증 코드 삭제
      redis.del(`verification:${email}`),
      // 인증 완료 상태 저장 (24시간 유효),
      redis.set(
        `${this.VERIFIED_EMAIL_PREFIX}${email}`,
        'true',
        'EX',
        24 * 60 * 60,
      ),
      // 사용 횟수 초기화
      redis.del(`verification:count:${email}`),
    ]);

    return true;
  }

  // 이메일 인증 상태 확인
  async isEmailVerified(email: string): Promise<boolean> {
    const redis = this.redisService.getClient();
    const verified = await redis.get(`${this.VERIFIED_EMAIL_PREFIX}:${email}`);
    return !!verified;
  }

  // 남은 전송 횟수 확인 메서드
  async getRemainingAttempts(email: string): Promise<number> {
    const count = await this.redisService
      .getClient()
      .get(`verification:count:${email}`);
    return this.DAILY_LIMIT - (count ? parseInt(count) : 0);
  }
}
