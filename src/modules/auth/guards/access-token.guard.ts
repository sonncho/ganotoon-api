import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenBlacklistService } from '../services/token-blacklist.service';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCode } from '@/common/constants';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private tokenBlacklistService: TokenBlacklistService) {
    super();
    console.log('TokenBlacklistService:', tokenBlacklistService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isValid = await super.canActivate(context);
      if (!isValid) {
        console.log('1');
        console.log(isValid);
        throw new BusinessException(ErrorCode.AUTH.INVALID_TOKEN);
      }

      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        throw new BusinessException(ErrorCode.AUTH.UNAUTHORIZED);
      }

      // Bearer 토큰 형식 체크
      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer' || !token) {
        console.log(3);
        throw new BusinessException(ErrorCode.AUTH.INVALID_TOKEN);
      }

      // 블랙리스트 체크
      if (await this.tokenBlacklistService.isBlacklisted(token)) {
        throw new BusinessException(ErrorCode.AUTH.TOKEN_BLACKLISTED);
      }

      return true;
    } catch (error) {
      // JWT 전략에서 발생하는 에러 처리
      if (error.name === 'TokenExpiredError') {
        throw new BusinessException(ErrorCode.AUTH.TOKEN_EXPIRED);
      }
      console.log(error);
      throw new BusinessException(ErrorCode.AUTH.INVALID_TOKEN);
    }
  }
}
