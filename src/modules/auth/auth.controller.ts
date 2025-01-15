import { SWAGGER_API_TAG } from '@/common/constants/swagger.constant';
import { Controller, Get, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags(SWAGGER_API_TAG.AUTH.name)
export class AuthController {
  @Get('/login')
  @Version('1')
  @ApiOperation({ summary: '회원 일반로그인' })
  async getHello() {
    return { message: '회원 로그인' };
  }
}
