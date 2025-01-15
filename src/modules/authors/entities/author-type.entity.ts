import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { AuthorType } from '../constants/author.constant';
import { WebtoonAuthor } from '@/modules/webtoons/entities/webtoon-author.entity';

@Entity('author_types')
export class AuthorTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AuthorType,
    unique: true,
    comment: '작가 유형',
  })
  name: AuthorType;

  @OneToMany(() => WebtoonAuthor, (webtoonAuthor) => webtoonAuthor.authorType)
  webtoonAuthors: WebtoonAuthor[];
}
