import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { OgmaModule } from '@ogma/nestjs-module';
import { SysLogModule } from 'src/sys-log/sys-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    OgmaModule.forFeature(AccountService),
    UserModule,
    SysLogModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
