import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntityWithDelete } from '@/common/entities/base.entity';
import {
  WebtoonStatus,
  ReleaseType,
  AgeRating,
} from '../constants/webtoon.constant';
import { Episode } from './episode.entity';
import { WebtoonLike } from './webtoon-like.entity';
import { WebtoonPageView } from './webtoon-page-view.entity';
import { WebtoonAuthor } from './webtoon-author.entity';
import { WebtoonGenre } from './webtoon-genre.entity';
import { Rating } from './rating.entity';
import { WebtoonSchedule } from './webtoon-schedule.entity';

@Entity('webtoons')
export class Webtoon extends BaseEntityWithDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '웹툰 제목',
  })
  title: string;

  @Column({
    type: 'text',
    comment: '웹툰 설명',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: WebtoonStatus,
    default: WebtoonStatus.ONGOING,
    comment: '연재 상태',
  })
  status: WebtoonStatus;

  @Column({
    name: 'thumbnail_square',
    type: 'varchar',
    length: 255,
    comment: '정사각형 썸네일',
  })
  thumbnailSquare: string;

  @Column({
    name: 'thumbnail_vertical',
    type: 'varchar',
    length: 255,
    comment: '세로형 썸네일',
  })
  thumbnailVertical: string;

  @Column({
    name: 'thumbnail_horizontal',
    type: 'varchar',
    length: 255,
    comment: '가로형 썸네일',
  })
  thumbnailHorizontal: string;

  @Column({
    name: 'title_logo_png',
    type: 'varchar',
    length: 255,
    comment: '타이틀 로고',
  })
  titleLogoPng: string;

  @Column({
    name: 'release_type',
    type: 'enum',
    enum: ReleaseType,
    comment: '연재 타입',
  })
  releaseType: ReleaseType;

  @Column({
    name: 'diamond_price',
    type: 'int',
    comment: '다이아 가격',
  })
  diamondPrice: number;

  @Column({
    name: 'age_rating',
    type: 'enum',
    enum: AgeRating,
    default: AgeRating.ALL,
    comment: '연령 등급',
  })
  ageRating: AgeRating;

  @Column({
    name: 'view_count',
    type: 'bigint',
    default: 0,
    comment: '작품 상세페이지 조회수',
  })
  viewCount: number;

  @Column({
    name: 'like_count',
    type: 'bigint',
    default: 0,
    comment: '구독자 수',
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
    name: 'wait_free_hours',
    type: 'int',
    nullable: true,
    comment: '기다리면 무료 시간',
  })
  waitFreeHours: number;

  @Column({
    name: 'wait_free_release_time',
    type: 'time',
    nullable: true,
    comment: '기다무 티켓 발급 시간',
  })
  waitFreeReleaseTime: string;

  @Column({
    name: 'rating_average',
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0,
    comment: '평균 평점',
  })
  ratingAverage: number;

  @Column({
    name: 'rating_count',
    type: 'int',
    default: 0,
    comment: '평점 개수',
  })
  ratingCount: number;

  // Relations
  @OneToMany(() => Episode, (episode) => episode.webtoon)
  episodes: Episode[];

  @OneToMany(() => WebtoonAuthor, (webtoonAuthor) => webtoonAuthor.webtoon)
  webtoonAuthors: WebtoonAuthor[];

  @OneToMany(() => WebtoonGenre, (webtoonGenre) => webtoonGenre.webtoon)
  webtoonGenres: WebtoonGenre[];

  @OneToMany(() => WebtoonLike, (like) => like.webtoon)
  likes: WebtoonLike[];

  @OneToMany(() => WebtoonPageView, (view) => view.webtoon)
  pageViews: WebtoonPageView[];

  @OneToMany(() => Rating, (rating) => rating.webtoon)
  ratings: Rating[];

  @OneToMany(() => WebtoonSchedule, (schedule) => schedule.webtoon)
  schedules: WebtoonSchedule[];
}
