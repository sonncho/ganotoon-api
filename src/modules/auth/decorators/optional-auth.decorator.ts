import { SetMetadata } from '@nestjs/common';

export const OptionalAuth = () => SetMetadata('auth:optional', true);
