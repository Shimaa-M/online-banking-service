import { Injectable } from '@nestjs/common';
import { RequestWithUser } from 'src/core/interfaces';
import { SysLogService } from 'src/sys-log/sys-log.service';
import { ActionsEnum } from 'src/sys-log/enums/actions.enums';
import { ActionTypeEnum } from './enums/action-type.enum';
import { BadRequestException } from '@nestjs/common/exceptions';
import { CreateAccountLedgerDto } from './dto/create-account-ledger';
import { AccountService } from 'src/account/account.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getManager, Repository, Transaction } from 'typeorm';
import { AccountLedger } from './entities/account-ledger.entity';
import { UserService } from 'src/user/user.service';
import { ProfileStatusEnum } from 'src/user/enums/profile-status.enum';
import { TransferLedgerDto } from './dto/transfer.dto';

@Injectable()

export class AccountLedgerService  {
 
  constructor(
    @InjectRepository(AccountLedger)
    private readonly accountLedgerRepository: Repository<AccountLedger>,
    private readonly sysLogsService: SysLogService,
    private readonly accountService: AccountService,
    private readonly userService: UserService
  ) {
  }
  async createWithdrawLedger(
    req:RequestWithUser,
    dto: CreateAccountLedgerDto,
    entityManager?: EntityManager
  ) {
    let calculatedAmount: number = 0,
      status: boolean = true,
      opened: boolean = true;
     // If an EntityManager is provided, use it for database operations
  const repository = entityManager ? entityManager.getRepository(AccountLedger) : this.accountLedgerRepository;
    const user = await this.userService.findOneById(req.user)
    if(user.status!=ProfileStatusEnum.ACCOUNT_COMPLETE) throw new BadRequestException('You don not have any account')
    const account = await this.accountService.findAccount(dto.cardID,user);
    if (!account) {
      throw new BadRequestException('wrong data');
    }
    this.sysLogsService.createLog(
      req.user,
      ActionsEnum.WITHDRAW,
      `Cash withdraw ${dto.amount}`
    );
    const { closingBalance, openingBalance, active } = account;
    if (!active) {
      throw new BadRequestException('the account is not active');
    }

        if (dto.amount > closingBalance) {
          throw new BadRequestException('the operation will not complete');
        }
        calculatedAmount = closingBalance - dto.amount;
      

        await this.accountService.updateAccount(
          account.id, calculatedAmount ,
      );
      return await repository.save({
        actionType: ActionTypeEnum.CASHOUT,
        cashBalanceBefore: closingBalance,
        newCashBalance: calculatedAmount,
        account,
        ...dto,
      });
  }
  async createDepositLedger(
    req:RequestWithUser,
    dto: CreateAccountLedgerDto,
    entityManager?: EntityManager
  ) {
    let calculatedAmount: number = 0,
      status: boolean = true,
      opened: boolean = true;
     // If an EntityManager is provided, use it for database operations
  const repository = entityManager ? entityManager.getRepository(AccountLedger) : this.accountLedgerRepository;
    const user = await this.userService.findOneById(req.user)
    if(user.status!=ProfileStatusEnum.ACCOUNT_COMPLETE) throw new BadRequestException('You don not have any account')
    const account = await this.accountService.findAccount(dto.cardID,user);
    if (!account) {
      throw new BadRequestException('wrong data');
    }
    this.sysLogsService.createLog(
      req.user,
      ActionsEnum.DEPOSIT,
      `Cash deposit ${dto.amount}`
    );
    const { closingBalance, openingBalance, active } = account;
    if (!active) {
      throw new BadRequestException('the account is not active');
    }
    calculatedAmount = closingBalance + dto.amount;
      

      await this.accountService.updateAccount(
          account.id, calculatedAmount
      );
      return await repository.save({
        actionType: ActionTypeEnum.CASHIN,
        cashBalanceBefore: closingBalance,
        newCashBalance: calculatedAmount,
        account,
        ...dto,
      });
  }
  async createTransferLedger(
    req:RequestWithUser,
    dto: TransferLedgerDto,
  ) {
   // const transferEntityManager = getManager(); // TypeORM EntityManager
    try {
      await this.accountLedgerRepository.manager.transaction(async transactionalEntityManager => {
        // Withdraw from the source account
        await this.createWithdrawLedger(req, { cardID: dto.cardID, amount: dto.amount, comments: dto.comments },
          transactionalEntityManager)
        console.log('done 1')
        await this.createDepositLedger(req, { cardID: dto.targetCardID, amount: dto.amount, comments: dto.comments },
          transactionalEntityManager)
          console.log('done 2')
      })
    }catch (error) {
      // Handle transaction failure
      throw new BadRequestException('Transaction failed');
    }
  }
  async findMyAccountLedger(req: RequestWithUser,cardID:string) {
    let userId=req.user.id
    this.sysLogsService.createLog(
      req.user,
     ActionsEnum.GET_ACCOUNTS,
     `Customer with ID ${req.user.id} got his accounts`
    );
    const account = await this.accountService.findAccount(cardID, req.user);
    let accountId=account.id
   return this.accountLedgerRepository.createQueryBuilder('accountledger')
      .leftJoinAndSelect('accountledger.account', 'account')
      .where('account.id = :accountId', { accountId })
      .getMany();
  }
}
