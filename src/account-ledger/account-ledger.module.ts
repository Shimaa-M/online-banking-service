import { forwardRef, Module } from '@nestjs/common';
import { SysLogModule } from 'src/sys-log/sys-log.module';
import { AccountLedgerService } from './account-ledger.service';
import { AccountLedgerController } from './account-ledger.controller';
import { AccountModule } from 'src/account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountLedger } from './entities/account-ledger.entity';
import { OgmaModule } from '@ogma/nestjs-module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountLedger]),
    OgmaModule.forFeature(AccountLedgerService),
    SysLogModule,
    UserModule,
   AccountModule
  ],
  providers: [AccountLedgerService],
  controllers: [AccountLedgerController],
  exports: [AccountLedgerService],
})
export class AccountLedgerModule {}
