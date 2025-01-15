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
import { RatingScore } from '../constants/rating.constant';

@Entity('ratings')
@Unique(['userId', 'webtoonId']) // 한 사용자는 하나의 웹툰에 하나의 평점만 가능
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'webtoon_id' })
  webtoonId: number;

  @Column({
    type: 'enum',
    enum: RatingScore,
    comment: '평점 (1-5)',
  })
  score: RatingScore;

  @Column({
    type: 'text',
    nullable: true,
    comment: '평가 코멘트',
  })
  comment: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.ratings, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
