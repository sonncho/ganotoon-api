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
    .setContact(
      'API Support',
      'https://your-domain.com/support',
      'support@your-domain.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setExternalDoc('추가 문서', 'https://your-domain.com/docs')
    .addServer('http://localhost:3000', '로컬 개발 서버')
    .addServer('https://api.stage.com', '스테이징 서버')
    .addServer('https://api.prod.com', '운영 서버')
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
  customSiteTitle: 'Ganotoon API Documentation',
  customJs: '/js/swagger-custom.js',
  customCssUrl: '/css/swagger-custom.css',
  swaggerOptions: {
    persistAuthorization: true, // 인증 정보 유지
    operationSorter: 'method',
    displayOperationId: true,
    displayRequestDuration: true, // 요청 시간 표시
    filter: true,
    // tagsSorter: 'alpha',
  },
};
