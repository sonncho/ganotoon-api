import { SWAGGER_API_TAG } from '@/common/constants/swagger.constant';
import { Body, Controller, Post, Res, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos';
import { AuthService } from './auth.service';
import { ApiDocs } from '@/common/decorators';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { parseDuration } from '@/common/utils/duration.util';

@Controller('auth')
@ApiTags(SWAGGER_API_TAG.AUTH.name)
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('login')
  @Version('1')
  @ApiDocs({
    summary: '일반 로그인',
    description: '일반 로그인 API입니다',
    errorCodes: ['USER.NOT_FOUND', 'USER.INVALID'],
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const loginResponse = await this.authService.login(loginDto);
    const maxAge = parseDuration(
      this.configService.get('auth.jwt.refreshExpiresIn'),
    );
    const isProduction = this.configService.get('app.nodeEnv') === 'production';

    response.cookie('refresh_token', loginResponse.refreshToken, {
      httpOnly: true,
      secure: isProduction, // HTTPS에서만 전송
      sameSite: 'strict',
      maxAge,
      path: '/auth/refresh',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken, ...result } = loginResponse;

    return result;
  }
}
