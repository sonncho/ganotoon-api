import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationConfig } from './config/validation.config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // API 프리픽스
  app.setGlobalPrefix('api/', {
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

  // CORS 설정
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe(validationConfig));

  // Swagger 설정
  setupSwagger(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation: ${await app.getUrl()}/api-docs`);
}

bootstrap();
