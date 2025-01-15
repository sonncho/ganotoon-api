import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Episode } from './episode.entity';
@Entity('episode_images')
export class EpisodeImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'episode_id' })
  episodeId: number;

  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 255,
    comment: '이미지 URL',
  })
  imageUrl: string;

  @Column({
    type: 'int',
    comment: '이미지 순서',
  })
  sequence: number;

  @Column({
    type: 'int',
    comment: '이미지 너비',
  })
  width: number;

  @Column({
    type: 'int',
    comment: '이미지 높이',
  })
  height: number;

  @Column({
    name: 'file_size',
    type: 'int',
    comment: '파일 크기(bytes)',
  })
  fileSize: number;

  @ManyToOne(() => Episode, (episode) => episode.images)
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;
}
