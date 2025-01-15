import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Webtoon } from './webtoon.entity';

@Entity('webtoon_likes')
@Unique(['userId', 'webtoonId']) // 한 사용자는 하나의 웹툰에 한 번만 좋아요 가능
export class WebtoonLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'webtoon_id' })
  webtoonId: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.likes, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
