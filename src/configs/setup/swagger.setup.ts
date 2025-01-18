import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { SWAGGER_API_TAG } from '../../common/constants/swagger.constant';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  const swaggerConfig = configService.get('swagger');

  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .setContact(
      swaggerConfig.contact.name,
      swaggerConfig.contact.url,
      swaggerConfig.contact.email,
    )
    .setLicense(swaggerConfig.license.name, swaggerConfig.license.url)
    .setExternalDoc(
      swaggerConfig.externalDocs.description,
      swaggerConfig.externalDocs.url,
    );

  // 서버 설정 추가
  swaggerConfig.servers.forEach((server) => {
    config.addServer(server.url, server.description);
  });

  // Bearer Auth 설정 추가
  config.addBearerAuth(swaggerConfig.auth);

  // 태그 자동 추가
  Object.values(SWAGGER_API_TAG)
    .sort((a, b) => a.order - b.order)
    .forEach((tag) => {
      config.addTag(tag.name, tag.description);
    });

  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup('api-docs', app, document, swaggerConfig.customOptions);
}
