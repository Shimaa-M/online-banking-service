
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigModuleConfig, OgmaModuleConfig, TypeOrmModuleConfig } from './config/options';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { OgmaModule } from '@ogma/nestjs-module';
import { MailModule } from './mail';
import { SysLogModule } from './sys-log/sys-log.module';
import { AccountModule } from './account/account.module';
import { AccountLedgerModule } from './account-ledger/account-ledger.module';

@Module({
  imports: [
    ConfigModule.forRootAsync(ConfigModule, { useClass: ConfigModuleConfig }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.Deferred], // Import your ConfigModule
      useClass: TypeOrmModuleConfig,
    }),
    OgmaModule.forRootAsync({
      useClass: OgmaModuleConfig,
      imports: [ConfigModule.Deferred],
    }),
    AuthModule,
    UserModule,
    CoreModule,
    MailModule,
    SysLogModule,
    AccountModule,
  AccountLedgerModule]
})
export class AppModule  {
 
}
