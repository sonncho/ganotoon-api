import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenBlacklistService } from '../services/token-blacklist.service';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCode } from '@/common/constants';

/**
 * Access Token 인증을 처리하는 가드입니다.
 * 1. 토큰의 존재 여부 확인
 * 2. 토큰의 만료 여부 확인
 * 3. 블랙리스트 체크
 * 4. 토큰 서명 검증
 * 의 과정을 수행합니다.
 */
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor(private tokenBlacklistService: TokenBlacklistService) {
    super();
  }

  private isOptional(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const optional = Reflect.getMetadata('auth:optional', handler);
    return !!optional;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isOptional = this.isOptional(context);
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    // 인증이 선택적이고 헤더가 없는 경우
    if (isOptional && !authHeader) {
      return true;
    }

    try {
      // Passport 전략을 통한 기본 검증
      const isValid = await super.canActivate(context);
      if (!isValid) throw new BusinessException(ErrorCode.AUTH.INVALID_TOKEN);

      if (!authHeader) throw new BusinessException(ErrorCode.AUTH.UNAUTHORIZED);

      // Bearer 토큰 형식 체크
      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer' || !token) {
        throw new BusinessException(ErrorCode.AUTH.INVALID_TOKEN);
      }

      // 블랙리스트 체크
      if (await this.tokenBlacklistService.isBlacklisted(token)) {
        throw new BusinessException(ErrorCode.AUTH.TOKEN_BLACKLISTED);
      }

      return true;
    } catch (error) {
      if (isOptional) {
        return true;
      }

      if (error.name === 'TokenExpiredError')
        throw new BusinessException(ErrorCode.AUTH.TOKEN_EXPIRED);

      if (error instanceof BusinessException) throw error;

      throw new BusinessException(ErrorCode.AUTH.INVALID_TOKEN);
    }
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): TUser {
    const isOptional = this.isOptional(context);

    if (err || (!user && !isOptional)) {
      throw new BusinessException(ErrorCode.AUTH.INVALID_TOKEN);
    }

    return user;
  }
}
