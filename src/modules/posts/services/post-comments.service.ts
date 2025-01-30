import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { PostComment } from '../entities/post-comment.entity';
import { UsersService } from '@/modules/users/users.service';
import { JwtPayload } from '@/modules/auth/types/tokens.type';
import {
  CreatePostCommentRequestDto,
  PostCommentResponseDto,
} from '../dtos/post-comment.dto';
import { ErrorCode } from '@/common/constants';
import { BusinessException } from '@/common/exceptions';

@Injectable()
export class PostCommentsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostComment)
    private readonly commentRepository: Repository<PostComment>,
    private readonly usersService: UsersService,
  ) {}

  //* 댓글 조회
  async findCommentsByPostId(postId: number, user?: JwtPayload) {
    const comments = await this.commentRepository.find({
      where: {
        postId,
        isActive: true,
        parentId: null, //최상위 댓글만 먼저 조회
      },
      relations: ['author', 'children', 'children.author', 'likes', 'reports'],
      order: {
        createdAt: 'DESC',
        children: {
          createdAt: 'ASC',
        },
      },
    });

    return comments.map((comment) =>
      PostCommentResponseDto.from(comment, user?.sub),
    );
  }

  //* 댓글 작성
  async createComment(
    postId: number,
    createCommentDto: CreatePostCommentRequestDto,
    author: JwtPayload,
  ): Promise<PostCommentResponseDto> {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
        isActive: true,
      },
    });

    console.log(createCommentDto);
    if (!post) throw new BusinessException(ErrorCode.POST.NOT_FOUND);

    const user = await this.usersService.findById(author.sub);
    if (!user) throw new BusinessException(ErrorCode.USER.NOT_FOUND);

    let parentComment = null;
    if (createCommentDto.parentId) {
      parentComment = await this.commentRepository.findOne({
        where: {
          id: createCommentDto.parentId,
          postId,
          isActive: true,
        },
      });

      console.log(parentComment);

      if (!parentComment)
        throw new BusinessException(ErrorCode.COMMENT.PARENT_NOT_FOUND);
      if (parentComment.parentId)
        // 부모댓글에 parentId가 있는경우
        throw new BusinessException(ErrorCode.COMMENT.NESTED_REPLY_NOT_ALLOWED);
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      post,
      postId,
      author: user,
      authorId: user.id,
      parent: parentComment,
      parentId: parentComment?.id,
    });

    const savedComment = await this.commentRepository.save(comment);
    // 전체 댓글 수와 활성 댓글 수 모두 증가
    await this.postRepository.update(
      { id: postId },
      {
        commentCount: () => '"comment_count" + 1',
        activeCommentCount: () => '"active_comment_count" + 1',
      },
    );

    return PostCommentResponseDto.from(savedComment, author.sub);
  }

  //* 댓글 신고
  async reportComment() {}

  //* 댓글 삭제
  async deleteComment() {}

  //* 댓글 수정
  async updateComment() {}
}
