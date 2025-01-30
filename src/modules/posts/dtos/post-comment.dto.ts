import { PaginationRequestDto } from '@/common/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { PostComment } from '../entities/post-comment.entity';

export enum CommentSortBy {
  LATEST = 'latest',
  LIKES = 'likes',
  REPLIES = 'replies',
}

export class FindCommentsRequestDto extends PaginationRequestDto {
  @ApiProperty({
    enum: CommentSortBy,
    description: '정렬 기준',
    required: false,
  })
  @IsEnum(CommentSortBy)
  @IsOptional()
  override sortBy?: CommentSortBy;
}

export class CreatePostCommentRequestDto {
  @ApiProperty({
    description: '댓글 내용',
    example: '댓글 내용입니다.',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  content: string;

  @ApiPropertyOptional({
    description: '부모 댓글 ID (대댓글인 경우)',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  parentId?: number;
}

class PostCommentAuthorDto {
  @ApiProperty({
    description: '작성자 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '작성자 이름',
    example: '홍길동',
  })
  nickname: string;

  @ApiProperty({
    description: '작성자 이메일',
    example: 'user@example.com',
  })
  email: string;
}

export class PostCommentResponseDto {
  @ApiProperty({
    description: '댓글 ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '댓글 내용',
    example: '댓글 내용입니다.',
  })
  content: string;

  @ApiProperty({
    description: '댓글 작성자 정보',
    type: PostCommentAuthorDto,
  })
  author: {
    id: number;
    nickname: string;
    email: string;
  };

  @ApiProperty({
    description: '생성 일시',
    example: '2024-01-29T12:34:56Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정 일시',
    example: '2024-01-29T12:34:56Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: '좋아요 수',
    example: 5,
  })
  likeCount: number;

  @ApiProperty({
    description: '현재 사용자의 좋아요 여부',
    example: false,
  })
  isLiked: boolean;

  @ApiPropertyOptional({
    description: '대댓글 목록',
    type: [PostCommentResponseDto],
    required: false,
  })
  children?: PostCommentResponseDto[];

  static from(
    entity: PostComment,
    currentUserId?: number,
  ): PostCommentResponseDto {
    return {
      id: entity.id,
      content: entity.content,
      author: {
        id: entity.author.id,
        nickname: entity.author.nickname,
        email: entity.author.email,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      likeCount: entity.likeCount,
      isLiked: currentUserId
        ? entity.likes?.some((like) => like.userId === currentUserId)
        : false,
      children: entity.children?.map((child) =>
        PostCommentResponseDto.from(child, currentUserId),
      ),
    };
  }
}
