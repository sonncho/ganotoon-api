import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { Webtoon } from './webtoon.entity';
import { Author } from '@/modules/authors/entities/author.entity';
import { AuthorTypeEntity } from '@/modules/authors/entities/author-type.entity';

@Entity('webtoon_authors')
export class WebtoonAuthor extends BaseEntity {
  @PrimaryColumn({ name: 'webtoon_id' })
  webtoonId: number;

  @PrimaryColumn({ name: 'author_id' })
  authorId: number;

  @PrimaryColumn({ name: 'author_type_id' })
  authorTypeId: number;

  @ManyToOne(() => Webtoon, (webtoon) => webtoon.webtoonAuthors, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'webtoon_id' })
  webtoon: Webtoon;

  @ManyToOne(() => Author, (author) => author.webtoonAuthors, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToOne(
    () => AuthorTypeEntity,
    (authorType) => authorType.webtoonAuthors,
    {
      onDelete: 'RESTRICT',
      nullable: false,
    },
  )
  @JoinColumn({ name: 'author_type_id' })
  authorType: AuthorTypeEntity;
}
