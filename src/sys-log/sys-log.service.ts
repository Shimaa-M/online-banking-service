import { Injectable } from '@nestjs/common';
import { SYSLog} from './entities/sys-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActionsEnum } from './enums/actions.enums';
import { User } from '../user/entities/user.entity';
import { RequestWithUser } from '../core/interfaces';

@Injectable()
export class SysLogService  {
  constructor(
    @InjectRepository(SYSLog)
  private readonly logRepository: Repository<SYSLog>,
  ) {}

  async createLog(id:User,action:ActionsEnum,note:string) {
 return await this.logRepository.save({user:id,action,note})
}
  async findOneLogPopulated(req: RequestWithUser) {
    let userId=req.user.id
    this.createLog(
      req.user,
     ActionsEnum.GET_LOG,
     `Customer with ID ${req.user.id} got his logs`
   );
   return this.logRepository.createQueryBuilder('syslog')
      .leftJoinAndSelect('syslog.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }
  async deleteLog(user:User,id: string): Promise<boolean>{
    this.createLog(
      user,
     ActionsEnum.DELETE_LOG,
     `Super admin deleted log with id ${id}`
   );
    const log = await this.logRepository.findOneById(id);
    await this.logRepository.remove(log);
    return true
}
 
}
