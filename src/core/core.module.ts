import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '../config/config.module';
import { healthcheckModule } from './healthcheck/healthcheck.module';
import { LoggingInterceptor } from './interceptors';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { OgmaModule } from '@ogma/nestjs-module';

@Module({
  imports: [
    healthcheckModule,
    OgmaModule.forFeature(HttpExceptionFilter),
    OgmaModule.forFeature(LoggingInterceptor),
    ConfigModule.Deferred,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class CoreModule {}
