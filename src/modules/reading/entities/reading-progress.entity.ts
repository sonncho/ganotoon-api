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
import { Episode } from '@/modules/webtoons/entities/episode.entity';

@Entity('reading_progress')
@Unique(['userId', 'episodeId'])
export class ReadingProgress extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'episode_id' })
  episodeId: number;

  @Column({
    name: 'last_read_image_sequence',
    type: 'int',
    comment: '마지막으로 읽은 이미지 순서',
  })
  lastReadImageSequence: number;

  @Column({
    name: 'progress_percentage',
    type: 'decimal',
    precision: 5,
    scale: 2,
    comment: '읽은 비율 (%)',
  })
  progressPercentage: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Episode, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;
}
