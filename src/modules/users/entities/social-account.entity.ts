import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { SocialProvider } from '../constants/user.constant';
import { User } from './user.entity';

@Entity('social_accounts')
export class SocialAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SocialProvider,
    comment: '소셜 로그인 제공자',
  })
  provider: SocialProvider;

  @Column({
    name: 'social_id',
    type: 'varchar',
    length: 100,
    comment: '소셜 계정 ID',
  })
  socialId: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.socialAccounts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
