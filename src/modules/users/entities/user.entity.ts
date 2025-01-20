import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { UserRole, Gender } from '../constants/user.constant';
import { SocialAccount } from './social-account.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    comment: '사용자 이메일',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '비밀번호(소셜로그인 시 null)',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '닉네임',
  })
  nickname: string;

  @Column({
    type: 'enum',
    enum: Gender,
    comment: '성별',
  })
  gender: Gender;

  @Column({
    type: 'boolean',
    name: 'is_email_verified',
    default: false,
    comment: '이메일 인증 완료 여부',
  })
  isEmailVerified: boolean;

  @Column({
    name: 'birth_date',
    type: 'date',
    comment: '생년월일',
  })
  birthDate: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    comment: '사용자 권한',
  })
  role: UserRole;

  @Column({
    name: 'profile_image',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '프로필 이미지 URL',
  })
  profileImage: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: '활성화 여부',
  })
  isActive: boolean;

  @Column({
    name: 'last_login_at',
    type: 'timestamp',
    nullable: true,
    comment: '마지막 로그인 시간',
  })
  lastLoginAt: Date;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Refresh Token',
  })
  refreshToken: string;

  @Column({
    name: 'refresh_token_expires_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Refresh Token 만료 시간',
  })
  refreshTokenExpiresAt: Date;

  @OneToMany(() => SocialAccount, (socialAccount) => socialAccount.user)
  socialAccounts: SocialAccount[];
}
