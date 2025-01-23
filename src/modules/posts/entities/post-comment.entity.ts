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
}
