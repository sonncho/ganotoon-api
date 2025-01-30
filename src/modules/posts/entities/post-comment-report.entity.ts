import { BaseEntityWithDelete } from '@/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostComment } from './post-comment.entity';
import { User } from '@/modules/users/entities';
import {
  CommentReportStatusEnum,
  CommentReportTypeEnum,
} from '../constants/comment.constant';

@Entity('post_comment_reports')
export class PostCommentReport extends BaseEntityWithDelete {
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
  @JoinColumn({ name: 'reporter_id' })
  reporter: User;

  @Column({
    name: 'reporter_id',
    comment: '신고자 ID',
  })
  reporterId: number;

  @Column({
    type: 'enum',
    enum: CommentReportTypeEnum,
    comment: '신고 유형',
  })
  type: CommentReportTypeEnum;

  @Column({
    type: 'text',
    nullable: true,
    comment: '신고 사유',
  })
  reason: string;

  @Column({
    type: 'enum',
    enum: CommentReportStatusEnum,
    default: CommentReportStatusEnum.PENDING,
    comment: '신고 처리 상태',
  })
  status: CommentReportStatusEnum;

  @Column({
    type: 'text',
    nullable: true,
    comment: '처리 결과',
  })
  result: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'processor_id' })
  processor: User;

  @Column({
    name: 'processor_id',
    nullable: true,
    comment: '처리자 ID',
  })
  processorId: number;

  @Column({
    name: 'processed_at',
    type: 'timestamp',
    nullable: true,
    comment: '처리 일시',
  })
  processedAt: Date;
}
