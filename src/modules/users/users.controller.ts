import {
  Controller,
  Post,
  Body,
  Version,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SWAGGER_API_TAG } from '@/common/constants/swagger.constant';
import { ApiDocs } from '@/common/decorators';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from './entities';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
@ApiTags(SWAGGER_API_TAG.USERS.name)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @Post()
  @ApiDocs({
    summary: '일반 회원가입',
    description: '이메일을 인증을 선행해야 회원가입이 가능합니다',
    response: CreateUserDto,
    errorCodes: [
      'USER.EMAIL_DUPLICATE',
      'USER.NICKNAME_DUPLICATE',
      'USER.EMAIL_NOT_VERIFIED',
      'COMMON.EMAIL_SEND_FAILED',
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

  @Version('1')
  @Get('me')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiDocs({
    summary: '내 정보 조회',
    // response: UserResponseDto,
    description: '내 정보를 조회합니다',
  })
  async getMyInfo(@GetUser() user: User) {
    const userData = await this.usersService.findById(user.id);
    return new UserResponseDto(userData);
  }
}
