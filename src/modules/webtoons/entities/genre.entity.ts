import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { WebtoonGenre } from './webtoon-genre.entity';

@Entity('genres')
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '장르 이름',
  })
  name: string;

  @OneToMany(() => WebtoonGenre, (webtoonGenre) => webtoonGenre.genre)
  webtoonGenres: WebtoonGenre[];
}
