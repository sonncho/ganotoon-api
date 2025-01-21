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
        subject: '이메일 인증 코드',
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
}
