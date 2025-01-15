import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntityWithDelete } from '@/common/entities/base.entity';
import { Webtoon } from './webtoon.entity';
import { EpisodeImage } from './episode-image.entity';
import { View } from './view.entitiy';
import { EpisodeView } from './episode-view.entity';

@Entity('episodes')
export class Episode extends BaseEntityWithDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'webtoon_id',
  })
  webtoonId: number;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '에피소드 제목',
  })
  title: string;

  @Column({
    name: 'episode_number',
    type: 'int',
    comment: '에피소드 번호',
  })
  episodeNumber: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '에피소드 썸네일',
  })
  thumbnail: string;

  @Column({
    name: 'total_images',
    type: 'int',
    comment: '총 이미지 수',
  })
  totalImages: number;

  @Column({
    name: 'view_count',
    type: 'bigint',
    default: 0,
    comment: '조회수',
  })
  viewCount: number;

  @Column({
    name: 'like_count',
    type: 'bigint',
    default: 0,
    comment: '좋아요 수',
  })
  likeCount: number;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: '활성화 여부',
  })
  isActive: boolean;

  @Column({
    name: 'published_at',
    type: 'timestamp',
    comment: '발행일시',
  })
  publishedAt: Date;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.episodes)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;

  @OneToMany(() => EpisodeImage, (image) => image.episode)
  images: EpisodeImage[];

  @OneToMany(() => EpisodeView, (view) => view.episode)
  views: View[];
}
