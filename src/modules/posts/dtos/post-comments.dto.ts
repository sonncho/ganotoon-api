import { PaginationRequestDto } from '@/common/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

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

export class PostCommentResponseDto {}
