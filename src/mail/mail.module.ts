import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule.Deferred,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
