import { BaseEntityWithDelete } from '@/common/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostTypeEnum } from '../constants/post.constant';
import { Post } from './post.entity';

@Entity('post_types')
export class PostType extends BaseEntityWithDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PostTypeEnum,
    unique: true,
    comment:
      '게시글 유형(NOTICE: 공지사항, QNA: Q&A, FAQ: FAQ, FREE: 자유게시판)',
  })
  type: PostTypeEnum;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '게시글 유형 이름',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '게시글 유형 설명',
  })
  description: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: '활성화 여부',
  })
  isActive: boolean;

  @Column({
    name: 'read_permission_roles',
    type: 'json',
    comment: '읽기 권한 역할 목록',
  })
  readPermissionRoles: string[];

  @Column({
    name: 'write_permission_roles',
    type: 'json',
    comment: '쓰기 권한 역할 목록',
  })
  writePermissionRoles: string[];

  @OneToMany(() => Post, (post) => post.postType)
  posts: Post[];
}
