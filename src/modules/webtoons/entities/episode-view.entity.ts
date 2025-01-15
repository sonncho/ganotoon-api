import { User } from '@/modules/users/entities';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Episode } from './episode.entity';

@Entity('episode_views')
export class EpisodeView extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'episode_id' })
  episodeId: number;

  @Column({
    name: 'read_duration',
    type: 'int',
    comment: '열람 시간(초)',
    nullable: true,
  })
  readDuration: number;

  @Column({
    name: 'last_read_image_sequence',
    type: 'int',
    comment: '마지막으로 본 이미지 순서',
    nullable: true,
  })
  lastReadImageSequence: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Episode, (episode) => episode.views, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;
}
