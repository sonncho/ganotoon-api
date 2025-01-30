import { BaseEntityWithDelete } from '@/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PostComment } from './post-comment.entity';
import { User } from '@/modules/users/entities';

@Entity('post_comment_likes')
@Unique(['commentId', 'userId']) // 한 사용자가 같은 댓글에 두 번 할 수 없도록
export class PostCommentLike extends BaseEntityWithDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostComment)
  @JoinColumn({ name: 'comment_id' })
  comment: PostComment;

  @Column({
    name: 'comment_id',
    comment: '댓글 ID',
  })
  commentId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'user_id',
    comment: '사용자 ID',
  })
  userId: number;
}
