import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities';

export class UserResponseDto {
  @ApiProperty({
    example: 1,
    description: '사용자 고유 ID',
  })
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일',
  })
  email: string;

  @ApiProperty({
    example: '닉네임123',
    description: '사용자 닉네임',
  })
  nickname: string;

  @ApiProperty({
    example: 'MALE',
    description: '성별',
    enum: ['MALE', 'FEMALE'],
  })
  gender: string;

  @ApiProperty({
    example: '1990-01-01',
    description: '생년월일',
  })
  birthDate: string;

  @ApiProperty({
    example: 'USER',
    description: '사용자 권한',
    enum: ['USER', 'ADMIN'],
  })
  role: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: '프로필 이미지 URL',
    nullable: true,
  })
  profileImage: string | null;

  @ApiProperty({
    example: true,
    description: '계정 활성화 여부',
  })
  isActive: boolean;

  @ApiProperty({
    example: '2025-01-20T13:32:50.000Z',
    description: '마지막 로그인 시간',
  })
  lastLoginAt: Date;

  @ApiProperty({
    example: '2025-01-13T13:44:10.323Z',
    description: '계정 생성 시간',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-01-20T13:32:49.000Z',
    description: '계정 정보 수정 시간',
  })
  updatedAt: Date;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
