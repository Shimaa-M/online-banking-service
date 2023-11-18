import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { RequestWithUser } from 'src/core/interfaces';
import { SysLogService } from 'src/sys-log/sys-log.service';
import { ActionsEnum } from 'src/sys-log/enums/actions.enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UserService } from 'src/user/user.service';
import { ProfileStatusEnum } from 'src/user/enums/profile-status.enum';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly sysLogsService: SysLogService,
    private readonly userService: UserService
  ) {
  }
   generateAccountNumber():string {
    // Implement a logic to generate a unique account number
    return 'ACC' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  }
  async createAccount(req: RequestWithUser, dto: CreateAccountDto) {
    await this.sysLogsService.createLog(
      req.user,
      ActionsEnum.CREATE_ACCOUNT,
     'customer created a new account'
    );
   
    const account = await this.accountRepository.save({
      ...dto,
      accountNumber:this.generateAccountNumber(),
      user:req.user,
      active: true,
      opened: false,
    });
    await this.userService.userRepository.update(req.user.id,{status:ProfileStatusEnum.ACCOUNT_COMPLETE})
    return account;
  }
  async findMyAccounts(req: RequestWithUser) {
    let userId=req.user.id
    this.sysLogsService.createLog(
      req.user,
     ActionsEnum.GET_ACCOUNTS,
     `Customer with ID ${req.user.id} got his accounts`
   );
   return this.accountRepository.createQueryBuilder('account')
      .leftJoinAndSelect('account.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }
  async findAccount(cardID: string, user: User) {
    let userId = user.id
    return await this.accountRepository.createQueryBuilder('account')
      .leftJoinAndSelect('account.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('account.cardID = :cardID', { cardID })
    .getOne();
  }
  async updateAccount(id:string,amount:number) {
    return await this.accountRepository.update({id
    },{closingBalance:amount})
  }
  
}
