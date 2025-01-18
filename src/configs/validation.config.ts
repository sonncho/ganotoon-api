import { registerAs } from '@nestjs/config';
import { ValidationPipeOptions } from '@nestjs/common';

export const validationConfig = registerAs(
  'validation',
  (): ValidationPipeOptions => ({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
    validationError: {
      target: false,
      value: false,
    },
  }),
);
