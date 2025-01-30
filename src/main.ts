import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './configs/setup';
import { GlobalExceptionFilter } from './common/filters';
import { TransformInterceptor } from './common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  // API 프리픽스
  app.setGlobalPrefix(`${configService.get('app.apiPrefix')}/`, {
    exclude: ['/', 'common/'], // health 엔드포인트는 프리픽스 제외
  });

  // API URI 버저닝
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    // defaultVersion: '1',
  });

  // 정적 파일 서비스 설정
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/',
  });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // CORS 설정
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe(configService.get('validation')));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger 설정
  setupSwagger(app);

  await app.listen(configService.get('app.port'));

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation: ${await app.getUrl()}/api-docs`);
}

bootstrap();
