import { ErrorCode } from '@/common/constants';
import { BusinessException } from '@/common/exceptions';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private mailerService: MailerService) {}

  async sendVerificationCode(email: string, code: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '[GANOTOON] 이메일 인증 코드',
        template: './verification',
        context: {
          code,
        },
      });
      this.logger.log(`Verification email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}:`, error);
      throw new BusinessException(ErrorCode.COMMON.EMAIL_SEND_FAILED);
    }
  }

  async sendWelcomeEmail(email: string, nickname: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '[GANOTOON] 회원가입을 환영합니다',
        template: './welcome',
        context: {
          nickname,
          signupDate: new Date().toLocaleDateString(),
        },
      });
      this.logger.log(`Welcome email sent to ${email}`);
    } catch (error) {
      this.logger.log(`Failed to send welcome email to ${nickname}:`, error);
      throw new BusinessException(ErrorCode.COMMON.EMAIL_SEND_FAILED);
    }
  }
}
