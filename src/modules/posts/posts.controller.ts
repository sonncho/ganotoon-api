import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { MemberOnly } from '../auth/decorators/member-only.decorator';
import { PostsService } from './posts.service';
import { ApiDocs } from '@/common/decorators';
import { CreatePostRequestDto } from './dtos/post.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { SWAGGER_API_TAG } from '@/common/constants';
import { JwtPayload } from '../auth/types/tokens.type';

@Controller('posts')
@ApiTags(SWAGGER_API_TAG.POSTS.name)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Version('1')
  @MemberOnly()
  @Post()
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
}
