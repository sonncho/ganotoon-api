import { SWAGGER_API_TAG } from '@/common/constants';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PostCommentsService } from '../services/post-comments.service';
import { ApiDocs } from '@/common/decorators';

import { GetUser } from '@/modules/auth/decorators/get-user.decorator';
import { JwtPayload } from '@/modules/auth/types/tokens.type';
import { Auth } from '@/modules/auth/decorators/auth.decorator';
import { CreatePostCommentRequestDto } from '../dtos/post-comment.dto';

@Controller('posts/:postId/comments')
@ApiParam({ name: 'postId', description: '게시글 ID' })
@ApiTags(SWAGGER_API_TAG.POSTS.name)
export class PostCommentsController {
  constructor(private readonly commentsService: PostCommentsService) {}

  @Auth()
  @ApiDocs({
    summary: '댓글 작성',
    description: '댓글을 작성합니다',
  })
  @Post()
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreatePostCommentRequestDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.commentsService.createComment(postId, createCommentDto, user);
  }

  @Auth({ isOptional: true })
  @ApiDocs({
    summary: '댓글 목록 조회',
    description: '댓글 목록을 조회합니다',
  })
  @Get()
  async findAll(
    @Param('postId', ParseIntPipe) postId: number,
    @GetUser() user?: JwtPayload,
  ) {
    return this.commentsService.findCommentsByPostId(postId, user);
  }
}
