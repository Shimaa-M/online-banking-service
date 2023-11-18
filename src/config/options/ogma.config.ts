import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { Injectable } from '@nestjs/common';
import { OgmaModuleOptions } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import { createWriteStream } from 'fs';
import { ConfigService } from '../config.service';

@Injectable()
export class OgmaModuleConfig implements ModuleConfigFactory<OgmaModuleOptions> {
  constructor(private readonly configService: ConfigService) {}

  createModuleConfig(): OgmaModuleOptions {
    return {
     
      logLevel: this.configService.logLevel,
      application: this.configService.appName,
      json: true,
      stream: createWriteStream('./server.log')
    }
  }
}
