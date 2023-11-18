import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './config/config.service';

export function initSwagger(app: INestApplication): void {
  const config = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle('Online banking API')
    .setDescription(
      '## 1. Getting started\n### 1.1 Download [Postman Collection](' + config.apiUrl + '-json)',
    )
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
