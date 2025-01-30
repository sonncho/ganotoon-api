import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { PostType } from '../entities/post-type.entity';
import { CreatePostRequestDto, PostResponseDto } from '../dtos/post.dto';
import { BusinessException } from '@/common/exceptions';
import { ErrorCode, SortOrder } from '@/common/constants';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../../auth/types/tokens.type';
import { FindPostsRequestDto, PostSortBy } from '../dtos/find-posts.dto';
import { PaginatedResponseDto } from '@/common/dtos';

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

  //* 단일 게시글 조회
  async findById(id: number, user?: JwtPayload) {
    //게시글 조회
    const post = await this.postRepository.findOne({
      where: { id, isActive: true },
      relations: ['author', 'postType', 'postComments'],
    });

    if (!post) throw new BusinessException(ErrorCode.POST.NOT_FOUND);

    //조회수 증가
    await this.postRepository.increment({ id }, 'viewCount', 1);
    return PostResponseDto.from(post, user?.sub);
  }

  //* 게시글 전체 조회
  async findAll(params: FindPostsRequestDto, user?: JwtPayload) {
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.postType', 'postType')
      .where('post.isActive = :isActive', { isActive: true });

    // 게시물 타입 필터링
    if (params.type) {
      queryBuilder.andWhere('postType.type = :type', { type: params.type });
    }

    // 검색어 필터링
    if (params.keyword) {
      queryBuilder.andWhere('post.title LIKE :keyword', {
        keyword: `%${params.keyword}%`,
      });
    }

    // 졍렬 적용
    if (params.sortBy === PostSortBy.COMMENTS) {
      queryBuilder.orderBy('commentCount', params.sortOrder || SortOrder.DESC);
    } else {
      const sortField = `post.${params.sortBy || 'createdAt'}`;
      queryBuilder.orderBy(sortField, params.sortOrder || SortOrder.DESC);
    }

    const [posts, total] = await queryBuilder
      .skip(params.skip)
      .take(params.limit)
      .getManyAndCount();

    return PaginatedResponseDto.from(
      posts.map((post) => PostResponseDto.from(post, user?.sub)),
      total,
      params.page,
      params.limit,
    );
  }
}
