import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dtos';
import { BusinessException } from '@/common/exceptions';
import { ErrorCode } from '@/common/constants';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { TokenBlacklistService } from './services/token-blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new BusinessException(ErrorCode.USER.NOT_FOUND);

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatches) throw new BusinessException(ErrorCode.USER.INVALID);

    await this.usersService.update(
      { id: user.id },
      {
        lastLoginAt: new Date(),
      },
    );

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, refreshTokenExpiresAt, ...userResponse } =
      user;

    return {
      user: userResponse,
      ...tokens,
    };
  }

  async logout(userId: number, accessToken: string): Promise<void> {
    await this.usersService.update(
      { id: userId },
      {
        refreshToken: null,
        refreshTokenExpiresAt: null,
        lastLoginAt: new Date(),
      },
    );

    await this.tokenBlacklistService.addToBlacklist(accessToken);
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken)
      throw new BusinessException(ErrorCode.USER.ACCESS_DENIED);
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches)
      throw new BusinessException(ErrorCode.USER.ACCESS_DENIED);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('auth.jwt.accessSecret'),
          expiresIn: this.configService.get<string>('auth.jwt.accessExpiresIn'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('auth.jwt.refreshSecret'),
          expiresIn: this.configService.get<string>(
            'auth.jwt.refreshExpiresIn',
          ),
        },
      ),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(
      { id: userId },
      {
        refreshToken: hashedRefreshToken,
      },
    );
  }
}
