import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { CommonModule } from '../common/common.module';
import { TokenBlacklistService } from './services/token-blacklist.service';

@Module({
  imports: [UsersModule, CommonModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TokenBlacklistService,
  ],
})
export class AuthModule {}
