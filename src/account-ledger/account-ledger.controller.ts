import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Param,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { RequestWithUser } from 'src/core/interfaces';
import {  RolesEnum } from 'src/user/enums/roles.enum';
import { AccountLedgerService } from './account-ledger.service';
import { CreateAccountLedgerDto } from './dto/create-account-ledger';
import { TransferLedgerDto } from './dto/transfer.dto';

@Controller('account-ledger')
@ApiTags('account-ledger')
export class AccountLedgerController {
  constructor(private readonly accountLedgerService:AccountLedgerService) {}

  @Post('me/deposit')
  @ApiOperation({ summary: 'Create a deposit ledger' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.CUSTOMER)
  deposit(@Req() req: RequestWithUser, @Body() dto: CreateAccountLedgerDto) {
    return this.accountLedgerService.createDepositLedger(
      req,
      dto,

    );
  }
  @Post('me/withdraw')
  @ApiOperation({ summary: 'Create a withdraw ledger' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.CUSTOMER)
  withdraw(@Req() req: RequestWithUser, @Body() dto: CreateAccountLedgerDto) {
    return this.accountLedgerService.createWithdrawLedger(
      req,
      dto,
    );
  }
  @Post('me/transfer')
  @ApiOperation({ summary: 'Create a transfer ledger' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.CUSTOMER)
  transfer(@Req() req: RequestWithUser, @Body() dto: TransferLedgerDto) {
    return this.accountLedgerService.createTransferLedger(
      req,
      dto,
    );
  }
  @Get('me/findOne/my-ledgers/:cardID')
  @ApiOperation({ summary: 'Find cash drawer ledger by id' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.CUSTOMER)
  async me(@Req() req: RequestWithUser,@Param('cardID') cardID:string) {
    return await this.accountLedgerService.findMyAccountLedger(
      req,cardID
    );
  }
}
