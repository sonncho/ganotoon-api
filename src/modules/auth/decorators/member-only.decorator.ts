import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/access-token.guard';

export function MemberOnly() {
  return applyDecorators(
    UseGuards(AccessTokenGuard),
    ApiBearerAuth(),
    // ApiUnauthorizedResponse({
    //   description: '인증되지 않은 사용자 또는 유효하지 않은 회원',
    // }),
  );
}
