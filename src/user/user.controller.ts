
import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Patch,
    Request,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { ApiOperation, ApiTags } from '@nestjs/swagger';
  import { RequestWithUser } from '../core/interfaces';
  import { User } from './entities/user.entity';
  import { CreateUserDto } from './dto/create-user.dto';
  import { JwtAuthGuard, RoleGuard } from '../auth/guards';
  import { RoleGroups, RolesEnum } from './enums/roles.enum';
import { Roles } from '../auth/decorators';
  
  @Controller('users')
  @ApiTags('users')
  @UseGuards(JwtAuthGuard, RoleGuard)
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a user with password' })
    @Roles(RolesEnum.SUPER_ADMIN)
    create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
       
      return this.userService.createWithPassword(createUserDto);
    }
  
    @Get('me/find')
    @ApiOperation({ summary: "Find user's own profile" })
    @Roles(...RoleGroups.PROFILE)
    me(@Request() req: RequestWithUser): Promise<User> {
      return this.userService.findOneById(req.user);
    }
  
    @Patch('me/update')
    @ApiOperation({ summary: "Update user's own profile" })
    @Roles(...RoleGroups.PROFILE)
    update(@Request() req: RequestWithUser, @Body() dto: UpdateUserDto): Promise<User> {
      return this.userService.update(req.user.id, dto);
    }
  
    @Delete('me/delete')
    @ApiOperation({ summary: "Delete user's own profile" })
    @Roles( ...RoleGroups.PROFILE)
    removeMe(@Request() req: RequestWithUser): Promise<boolean> {
      return this.userService.deleteUser(req);
    }
  
  }
  