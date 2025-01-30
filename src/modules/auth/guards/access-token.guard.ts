import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenBlacklistService } from '../services/token-blacklist.service';
import { BusinessException } from '@/common/exceptions/business.exception';
import { ErrorCode } from '@/common/constants';

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
      const isValid = await super.canActivate(context);
      if (!isValid) throw new BusinessException(ErrorCode.AUTH.INVALID_TOKEN);

      if (!authHeader) throw new BusinessException(ErrorCode.AUTH.UNAUTHORIZED);

      // Bearer 토큰 형식 체크
      const [type, token] = authHeader.split(' ');
      if (type !== 'Bearer' || !token)
        throw new BusinessException(ErrorCode.AUTH.INVALID_TOKEN);

      // 블랙리스트 체크
      if (await this.tokenBlacklistService.isBlacklisted(token))
        throw new BusinessException(ErrorCode.AUTH.TOKEN_BLACKLISTED);

      return true;
    } catch (error) {
      // 선택적 인증이고 토큰이 유효하지 않은 경우
      if (isOptional) {
        return true;
      }

      // JWT 전략에서 발생하는 에러 처리
      if (error.name === 'TokenExpiredError')
        throw new BusinessException(ErrorCode.AUTH.TOKEN_EXPIRED);

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

    // 에러가 있고 선택적이지 않은 경우에만 에러 throw
    if (err && !isOptional) {
      throw err;
    }

    // 선택적 인증인 경우 user가 없어도 undefined 반환
    return user;
  }
}
