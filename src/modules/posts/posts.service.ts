import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostType } from './entities/post-type.entity';
import { CreatePostRequestDto, PostResponseDto } from './dtos/post.dto';
import { BusinessException } from '@/common/exceptions';
import { ErrorCode } from '@/common/constants';
import { UsersService } from '../users/users.service';
import { JwtPayload } from '../auth/types/tokens.type';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostType)
    private readonly postTypeRepository: Repository<PostType>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createPostDto: CreatePostRequestDto,
    author: JwtPayload,
  ): Promise<PostResponseDto> {
    const user = await this.usersService.findById(author.sub);
    if (!user) throw new BusinessException(ErrorCode.USER.NOT_FOUND);

    // 게시글 타입이 존재하는지 확인
    const postType = await this.postTypeRepository.findOne({
      where: { type: createPostDto.type, isActive: true },
    });
    if (!postType) throw new BusinessException(ErrorCode.POST.TYPE_NOT_FOUND);

    // 작성권한 확인
    const hasWritePermission = postType.writePermissionRoles.includes(
      user.role,
    );

    if (!hasWritePermission)
      throw new BusinessException(ErrorCode.POST.NO_WRITE_PERMISSION);

    // 새 게시글 생성
    const post = this.postRepository.create({
      ...createPostDto,
      author: user,
      authorId: user.id,
      postType,
      postTypeId: postType.id,
    });

    // 저장 및 반환
    const savedPost = await this.postRepository.save(post);
    return PostResponseDto.from(savedPost);
  }
}
