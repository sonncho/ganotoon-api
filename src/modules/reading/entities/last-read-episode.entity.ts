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
import { Webtoon } from '@/modules/webtoons/entities/webtoon.entity';
import { Episode } from '@/modules/webtoons/entities/episode.entity';

@Entity('last_read_episodes')
@Unique(['userId', 'webtoonId'])
export class LastReadEpisode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'webtoon_id' })
  webtoonId: number;

  @Column({ name: 'episode_id' })
  episodeId: number;

  @Column({
    name: 'read_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '마지막 읽은 시간',
  })
  readAt: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Webtoon, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;

  @ManyToOne(() => Episode, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;
}
