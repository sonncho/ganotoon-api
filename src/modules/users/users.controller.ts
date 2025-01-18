import { Controller, Post, Body, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SWAGGER_API_TAG } from '@/common/constants/swagger.constant';
import { ApiDocs } from '@/common/decorators';

@Controller('users')
@ApiTags(SWAGGER_API_TAG.USERS.name)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @Post()
  @ApiDocs({
    summary: '일반 회원가입',
    description: '새로운 사용자를 생성합니다',
    successType: CreateUserDto,
    errorCodes: [
      'USER.EMAIL_DUPLICATE',
      'USER.NICKNAME_DUPLICATE',
      'COMMON.INTERNAL_ERROR',
    ],
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  }
}
