import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationConfig } from './config/validation.config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API 버전 프리픽스
  app.setGlobalPrefix('api/v1', {
    exclude: ['/health', '/'], // health 엔드포인트는 프리픽스 제외
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
