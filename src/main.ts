import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configure } from './config.main';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    cors: true,
    //logger:['debug', 'verbose', 'error', 'warn'],
  });
  const config = app.get(ConfigService);
  const port = process.env.PORT || config.port;
  configure(app, config);
  await app.listen(port);
  Logger.verbose(`${config.nodeEnv} | http://localhost:${port}/api`, 'NestApplication');
}
bootstrap();
