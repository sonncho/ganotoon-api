import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Gender } from '../constants/user.constant';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일',
  })
  @IsEmail({}, { message: '유효한 이메일을 입력해주세요' })
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: '비밀번호 (8-20자, 영문, 숫자, 특수문자 포함)',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, {
    message: '비밀번호는 8-20자, 영문, 숫자, 특수문자를 포함해야 합니다',
  })
  password: string;

  @ApiProperty({
    example: '닉네임123',
    description: '사용자 닉네임',
  })
  @IsString()
  @MinLength(2)
  nickname: string;

  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
    description: '성별',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: '1990-01-01',
    description: '생년월일',
  })
  @IsDateString()
  birthDate: string;
}
