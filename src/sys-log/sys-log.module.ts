import { Global, Module } from '@nestjs/common';
import { SYSLog} from './entities/sys-log.entity';
import { SysLogController } from './sys-log.controller';
import { SysLogService } from './sys-log.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SYSLog]),
  ],
  controllers: [SysLogController],
  providers: [SysLogService],
  exports: [SysLogService],
})
export class SysLogModule {}
