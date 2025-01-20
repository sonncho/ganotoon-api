import { SWAGGER_API_TAG } from '@/common/constants/swagger.constant';
import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos';
import { AuthService } from './auth.service';
import { ApiDocs } from '@/common/decorators';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { parseDuration } from '@/common/utils/duration.util';
import { AccessTokenGuard } from './guards/access-token.guard';

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

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '로그아웃' })
  @Version('1')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userId = req.user['sub'];
    const accessToken = req.headers['authorization']?.replace('Bearer ', '');

    await this.authService.logout(userId, accessToken);

    // refresh token 쿠키 제거
    response.cookie('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      path: '/auth/refresh',
    });

    return null;
  }
}
