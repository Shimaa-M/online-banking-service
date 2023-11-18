import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '../config/config.module';
import { MailModule } from '../mail';
import { SysLogModule } from '../sys-log/sys-log.module';
import { OgmaModule } from '@ogma/nestjs-module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    OgmaModule.forFeature(UserService),
    ConfigModule.Deferred,
    MailModule,
    SysLogModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
