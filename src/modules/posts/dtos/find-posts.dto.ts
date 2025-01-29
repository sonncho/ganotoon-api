import { PaginationRequestDto } from '@/common/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { PostTypeEnum } from '../constants/post.constant';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum PostSortBy {
  LATEST = 'createdAt', // 최신순
  VIEWS = 'viewCount', // 조회수순
  COMMENTS = 'commentCount', // 댓글많은순
}

export class FindPostsRequestDto extends PaginationRequestDto {
  @ApiProperty({
    enum: PostSortBy,
    description:
      '정렬 기준(createdAt: 최신순, viewCount: 조회수순, commentCount: 댓글순)',
    required: false,
  })
  @IsEnum(PostSortBy)
  @IsOptional()
  override sortBy?: PostSortBy = PostSortBy.LATEST;

  @ApiProperty({
    enum: PostTypeEnum,
    description: '게시글 타입',
    required: false,
  })
  @IsEnum(PostTypeEnum)
  @IsOptional()
  type?: PostTypeEnum;

  @ApiProperty({
    description: '검색어 (제목)',
    required: false,
  })
  @IsString()
  @IsOptional()
  keyword?: string;
}
