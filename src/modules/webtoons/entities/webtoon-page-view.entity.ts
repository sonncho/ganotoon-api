import { User } from '@/modules/users/entities';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Webtoon } from './webtoon.entity';

@Entity('webtoon_page_views')
export class WebtoonPageView extends BaseEntity {
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

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.pageViews, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;
}
