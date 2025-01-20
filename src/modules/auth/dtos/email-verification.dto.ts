import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SendVerificationDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '인증할 이메일 주소',
  })
  @IsEmail({}, { message: '유효한 이메일을 입력해주세요' })
  email: string;
}

export class VerifyEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '인증할 이메일 주소',
  })
  @IsEmail({}, { message: '유효한 이메일을 입력해주세요' })
  email: string;

  @ApiProperty({
    example: '123456',
    description: '이메일로 받은 6자리 인증 코드',
  })
  @IsString()
  @Length(6, 6, { message: '인증 코드는 6자리여야 합니다' })
  code: string;
}
