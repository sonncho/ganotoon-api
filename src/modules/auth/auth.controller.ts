import { SWAGGER_API_TAG } from '@/common/constants/swagger.constant';
import { Body, Controller, Post, Req, Res, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, SendVerificationDto, VerifyEmailDto } from './dtos';
import { AuthService } from './auth.service';
import { ApiDocs } from '@/common/decorators';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { parseDuration } from '@/common/utils/duration.util';
import { VerificationService } from './services/verification.service';
import { MemberOnly } from './decorators/member-only.decorator';

@Controller('auth')
@ApiTags(SWAGGER_API_TAG.AUTH.name)
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private verficationService: VerificationService,
  ) {}

  @Post('login')
  @Version('1')
  @ApiDocs({
    summary: '일반 로그인',
    description: '일반 로그인 API입니다',
    errorCodes: ['USER.NOT_FOUND', 'USER.INVALID', 'USER.EMAIL_NOT_VERIFIED'],
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
  @MemberOnly()
  @ApiDocs({
    summary: '로그아웃',
    description: '로그아웃시 Header에 accessToken이 필요합니다',
  })
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

  @Post('email/send-verification')
  @Version('1')
  @ApiOperation({ summary: '이메일 인증 코드 발송' })
  @ApiResponse({
    status: 200,
    description: '인증 코드 발송 성공',
    schema: {
      example: {
        success: true,
        data: {
          remainingAttempts: 4,
        },
        error: null,
      },
    },
  })
  async sendVerificationEmail(@Body() dto: SendVerificationDto) {
    await this.verficationService.sendVerificationCode(dto.email);
    const remainingAttempts =
      await this.verficationService.getRemainingAttempts(dto.email);

    return { remainingAttempts };
  }

  @Post('email/verify')
  @Version('1')
  @ApiDocs({
    summary: '이메일 인증 코드 확인',
    description: '발송된 인증 코드를 확인하는 API입니다',
    errorCodes: ['COMMON.INVALID_CODE'],
  })
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    const isVerified = await this.verficationService.verifyEmail(
      dto.email,
      dto.code,
    );

    return { isVerified };
  }

  @Post('refresh')
  @Version('1')
  @MemberOnly()
  @ApiOperation({
    summary: '토큰 갱신',
    description:
      'cookie에 담긴 refresh_token으로 새로운 accessToken을 발급합니다',
  })
  @ApiResponse({
    status: 200,
  })
  async refresh(@Req() req: Request) {
    const user = req.user;
    const refreshToken = req.cookies['refresh_token'];

    const tokens = await this.authService.refreshTokens(
      user['sub'],
      refreshToken,
    );

    return tokens;
  }
}
