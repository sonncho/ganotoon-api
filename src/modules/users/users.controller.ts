import { Controller, Post, Body, Version } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SWAGGER_API_TAG } from '@/common/constants/swagger.constant';

@Controller('users')
@ApiTags(SWAGGER_API_TAG.USERS.name)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @Post()
  @ApiOperation({ summary: '일반 회원가입' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    };
  }
}
