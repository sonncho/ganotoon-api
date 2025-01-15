import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entities/base.entity';
import { WebtoonAuthor } from '@/modules/webtoons/entities/webtoon-author.entity';

@Entity('authors')
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '작가 이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    comment: '작가 이메일',
  })
  email: string;

  @Column({
    name: 'profile_image',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '프로필 이미지',
  })
  profileImage: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '작가 소개',
  })
  description: string;

  @OneToMany(() => WebtoonAuthor, (webtoonAuthor) => webtoonAuthor.author)
  webtoonAuthors: WebtoonAuthor[];
}
