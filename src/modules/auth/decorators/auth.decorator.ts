import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { OptionalAuth } from './optional-auth.decorator';

interface AuthOptions {
  isOptional?: boolean;
}

export function Auth(options: AuthOptions = {}) {
  const { isOptional = false } = options;

  const decorators = [UseGuards(AccessTokenGuard), ApiBearerAuth()];

  if (isOptional) decorators.push(OptionalAuth());

  return applyDecorators(...decorators);
}
