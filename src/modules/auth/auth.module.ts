import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { CommonModule } from '../common/common.module';
import { TokenBlacklistService } from './services/token-blacklist.service';
import { VerificationService } from './services/verification.service';
import { AccessTokenGuard } from './guards/access-token.guard';

@Module({
  imports: [
    CommonModule,
    forwardRef(() => UsersModule),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TokenBlacklistService,
    VerificationService,
    AccessTokenGuard,
  ],
  exports: [
    AuthService,
    VerificationService,
    TokenBlacklistService,
    AccessTokenGuard,
  ],
})
export class AuthModule {}
