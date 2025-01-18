import { registerAs } from '@nestjs/config';
import { SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = registerAs('swagger', () => ({
  title: 'Webtoon Platform API',
  description: 'The Webtoon Platform API Documentation',
  version: '1.0',
  contact: {
    name: 'API Support',
    url: 'https://your-domain.com/support',
    email: 'support@your-domain.com',
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
  externalDocs: {
    description: '추가 문서',
    url: 'https://your-domain.com/docs',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: '로컬 개발 서버',
    },
    {
      url: 'https://api.stage.com',
      description: '스테이징 서버',
    },
    {
      url: 'https://api.prod.com',
      description: '운영 서버',
    },
  ],
  auth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
  },
  customOptions: {
    customSiteTitle: 'Ganotoon API Documentation',
    customJs: '/js/swagger-custom.js',
    customCssUrl: '/css/swagger-custom.css',
    swaggerOptions: {
      persistAuthorization: true,
      operationSorter: 'method',
      displayOperationId: true,
      displayRequestDuration: true,
      filter: true,
    },
  } as SwaggerCustomOptions,
}));
