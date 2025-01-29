import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PostTypeEnum } from '../constants/post.constant';
import { Post } from '../entities/post.entity';

export class CreatePostRequestDto {
  @ApiProperty({
    type: 'string',
    description: '게시글 제목 (최대 200자)',
    example: '첫 번째 게시글',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty({
    type: 'string',
    description: '게시글 내용',
    example: '게시글 내용입니다.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    enum: PostTypeEnum,
    enumName: 'PostTypeEnum',
    description:
      '게시글 타입 (NOTICE: 공지사항, QNA: Q&A, FAQ: FAQ, FREE: 자유게시판)',
    example: PostTypeEnum.NOTICE,
    required: true,
  })
  @IsEnum(PostTypeEnum)
  @IsNotEmpty()
  type: PostTypeEnum;
}

class PostTypeResponseDto {
  @ApiProperty({ example: 'FREE' })
  type: PostTypeEnum;

  @ApiProperty({ example: '자유게시판' })
  name: string;
}

class AuthorResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '닉네임123' })
  nickname: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;
}

export class PostResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '첫 번째 게시글' })
  title: string;

  @ApiProperty({ example: '게시글 내용입니다.' })
  content: string;

  @ApiProperty({ example: 0 })
  viewCount: number;

  @ApiProperty({ example: 0 })
  commentCount: number;

  @ApiProperty({ example: false })
  isOwner: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  postType: PostTypeResponseDto;

  @ApiProperty()
  author: AuthorResponseDto;

  static from(post: Post, userId?: number): PostResponseDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      viewCount: post.viewCount,
      commentCount: post.postComments?.length || 0,
      isOwner: userId ? post.authorId === userId : false, // 소유 여부 체크
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      postType: {
        type: post.postType.type,
        name: post.postType.name,
      },
      author: {
        id: post.author.id,
        nickname: post.author.nickname,
        email: post.author.email,
      },
    };
  }
}
