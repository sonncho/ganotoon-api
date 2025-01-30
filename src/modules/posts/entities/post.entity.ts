import { BaseEntityWithDelete } from '@/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType } from './post-type.entity';
import { User } from '@/modules/users/entities';
import { PostComment } from './post-comment.entity';

@Entity('posts')
export class Post extends BaseEntityWithDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    comment: '게시글 제목',
  })
  title: string;

  @Column({
    type: 'text',
    comment: '게시글 내용',
  })
  content: string;

  @Column({
    name: 'view_count',
    type: 'int',
    default: 0,
    comment: '조회수',
  })
  viewCount: number;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: '활성화 여부',
  })
  isActive: boolean;

  @ManyToOne(() => PostType, (postType) => postType.posts)
  @JoinColumn({ name: 'post_type_id' })
  postType: PostType;

  @Column({
    name: 'post_type_id',
    comment: '게시글 유형 ID',
  })
  postTypeId: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({
    name: 'author_id',
    nullable: false,
    comment: '작성자 ID',
  })
  authorId: number;

  @OneToMany(() => PostComment, (comment) => comment.post)
  postComments: PostComment[];

  @Column({
    name: 'comment_count',
    type: 'int',
    default: 0,
    comment: '댓글 수',
  })
  commentCount: number;

  // 활성화된 댓글 수만 별도로 관리하는 것도 고려해볼 수 있습니다
  @Column({
    name: 'active_comment_count',
    type: 'int',
    default: 0,
    comment: '활성화된 댓글 수',
  })
  activeCommentCount: number;
}
