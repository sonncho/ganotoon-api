import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { PostsService } from './posts.service';
import { ApiDocs } from '@/common/decorators';
import { CreatePostRequestDto, PostResponseDto } from './dtos/post.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { SWAGGER_API_TAG } from '@/common/constants';
import { JwtPayload } from '../auth/types/tokens.type';
import { FindPostsRequestDto } from './dtos/find-posts.dto';
import { PaginatedResponseDto } from '@/common/dtos';

import { Auth } from '../auth/decorators/auth.decorator';

@Controller('posts')
@ApiTags(SWAGGER_API_TAG.POSTS.name)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Version('1')
  @Auth()
  @ApiDocs({
    summary: '게시글 생성(회원 전용)',
    description: '새로운 게시글을 생성합니다.',
    errorCodes: [
      'AUTH.UNAUTHORIZED',
      'AUTH.INVALID_TOKEN',
      'AUTH.TOKEN_EXPIRED',
      'AUTH.TOKEN_BLACKLISTED',
      'POST.TYPE_NOT_FOUND',
      'POST.NO_WRITE_PERMISSION',
    ],
  })
  // @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({ type: CreatePostRequestDto })
  async create(
    @Body() createPostDto: CreatePostRequestDto,
    @GetUser() user: JwtPayload,
  ) {
    return await this.postsService.create(createPostDto, user);
  }

  @Get(':id')
  @Version('1')
  @Auth({ isOptional: true })
  @ApiDocs({
    summary: '게시글 상세 조회',
    description: '게시글 상세 정보를 조회합니다',
    errorCodes: ['POST.NOT_FOUND'],
    response: PostResponseDto,
  })
  @ApiOkResponse({})
  async findById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user?: JwtPayload,
  ): Promise<PostResponseDto> {
    console.log(user);
    return await this.postsService.findById(id, user);
  }

  @Get()
  @Version('1')
  @Auth({ isOptional: true })
  @ApiDocs({
    summary: '게시글 목록 조회',
    description: '게시글 전체 목록을 조회합니다',
  })
  async findAll(
    @Query() params: FindPostsRequestDto,
    @GetUser() user?: JwtPayload,
  ): Promise<PaginatedResponseDto<PostResponseDto>> {
    return await this.postsService.findAll(params, user);
  }
}
