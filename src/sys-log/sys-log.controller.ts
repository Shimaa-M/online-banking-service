import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SysLogService } from './sys-log.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { RequestWithUser } from 'src/core/interfaces';
import { RoleGroups, RolesEnum } from '../user/enums/roles.enum';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('sys-log')
@ApiTags('sys-log')
export class SysLogController {
  constructor(private readonly SYSLogsService: SysLogService) {}

  @Get('my-logs')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(...RoleGroups.PROFILE)
  @ApiOperation({ summary: 'Find own logs' })
  findOne(@Request() req: RequestWithUser) {
    return this.SYSLogsService.findOneLogPopulated(req);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RolesEnum.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete one log by id' })
  remove(@Request() req: RequestWithUser, @Param('id') id: string): Promise<boolean> {
    return this.SYSLogsService.deleteLog(req.user,id);
  }

}
