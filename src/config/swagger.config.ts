import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SWAGGER_API_TAG } from 'src/common/constants/swagger.constant';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Webtoon Platform API')
    .setDescription('The Webtoon Platform API Documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    });

  // 태그 자동 추가
  Object.values(SWAGGER_API_TAG).forEach((tag) => {
    config.addTag(tag.name, tag.description);
  });

  Object.values(SWAGGER_API_TAG)
    .sort((a, b) => a.order - b.order)
    .forEach((tag) => {
      config.addTag(tag.name, tag.description);
    });

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
}

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    // tagsSorter: 'alpha',
  },
  customSiteTitle: 'Webtoon API Docs',
};
