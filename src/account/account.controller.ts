import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { RequestWithUser } from 'src/core/interfaces';
import {  RolesEnum } from 'src/user/enums/roles.enum';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountService } from './account.service';

@Controller('account')
@ApiTags('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('me/create')
  @ApiOperation({ summary: 'Create a cash drawer' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.CUSTOMER)
  create(@Req() req: RequestWithUser, @Body() dto: CreateAccountDto) {
    return this.accountService.createAccount(req, dto);
  }
 
  
  @Get('me/findOne/accounts')
  @ApiOperation({ summary: 'Find all account of user' })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.CUSTOMER)
  async me(@Req() req: RequestWithUser) {
    return await this.accountService.findMyAccounts(req);
  }
}
