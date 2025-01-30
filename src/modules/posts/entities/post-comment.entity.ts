import { BaseEntityWithDelete } from '@/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from '@/modules/users/entities';
import { PostCommentLike } from './post-comment-like.entity';
import { PostCommentReport } from './post-comment-report.entity';

@Entity('post_comments')
export class PostComment extends BaseEntityWithDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    comment: '댓글 내용',
  })
  content: string;

  @ManyToOne(() => Post, (post) => post.postComments)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({
    name: 'post_id',
    comment: '게시글 ID',
  })
  postId: number;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    comment: '활성화 여부',
  })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.postComments)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({
    name: 'author_id',
    comment: '작성자 ID',
  })
  authorId: number;

  @ManyToOne(() => PostComment, (comment) => comment.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_id' })
  parent: PostComment;

  @Column({
    name: 'parent_id',
    nullable: true,
    comment: '부모 댓글 ID',
  })
  parentId: number;

  @OneToMany(() => PostComment, (comment) => comment.parent)
  children: PostComment[];

  @OneToMany(() => PostCommentLike, (like) => like.comment)
  likes: PostCommentLike[];

  @OneToMany(() => PostCommentReport, (report) => report.comment)
  reports: PostCommentReport[];

  // 좋아요 수를 저장하는 필드 (성능 최적화를 위해)
  @Column({
    name: 'like_count',
    type: 'int',
    default: 0,
    comment: '좋아요 수',
  })
  likeCount: number;

  // 신고 수를 저장하는 필드 (성능 최적화를 위해)
  @Column({
    name: 'report_count',
    type: 'int',
    default: 0,
    comment: '신고 수',
  })
  reportCount: number;
}
