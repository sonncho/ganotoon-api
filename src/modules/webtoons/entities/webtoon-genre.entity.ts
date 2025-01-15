import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Webtoon } from './webtoon.entity';
import { Genre } from './genre.entity';

@Entity('webtoon_genres')
export class WebtoonGenre extends BaseEntity {
  @PrimaryColumn()
  webtoonId: number;

  @PrimaryColumn()
  genreId: number;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.webtoonGenres)
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;

  @ManyToOne(() => Genre, (genre) => genre.webtoonGenres)
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;
}
