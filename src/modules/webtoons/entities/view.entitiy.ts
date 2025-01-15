import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Episode } from './episode.entity';

@Entity('views')
export class View extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'episode_id' })
  episodeId: number;

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
