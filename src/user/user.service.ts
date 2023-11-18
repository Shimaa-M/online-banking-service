
import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SignUpDto} from '../auth/dto';
import {  RolesEnum } from './enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomBytes } from 'crypto';
import { ProfileStatusEnum } from './enums/profile-status.enum';
import { User } from './entities/user.entity';
import { MailService } from '../mail';
import { SysLogService } from '../sys-log/sys-log.service';
import { ActionsEnum } from '../sys-log/enums/actions.enums';
import { RequestWithUser } from '../core/interfaces';

@Injectable()
export class UserService  {
    constructor(
        @InjectRepository(User)
      readonly userRepository: Repository<User>,
      private readonly mailService: MailService,
      private readonly sysLogService: SysLogService
  ) {
  }
    async createWithPassword(userDto: CreateUserDto|SignUpDto): Promise<User> {
      try {
        userDto.password = bcrypt.hashSync(userDto.password, 10);
        const user = await this.userRepository.save({ ...userDto, role: RolesEnum.CUSTOMER });
        const token = randomBytes(32).toString('hex')
        await this.userRepository.update({id: user.id},{verificationCode:token})
        this.mailService.sendSignUpMail(user.email, token);
        await this.sysLogService.createLog(user, ActionsEnum.SIGNUP, 'you have registered')
        delete user.password
        return user as User
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('User with this email already exists.');
      }
      throw error;
    }
  }

  async findOneById(user:User): Promise<User> {
    const userFound = await this.userRepository.findOne({ where: { id:user.id } });

    if (!userFound) {
      throw new NotFoundException('User not found.');
    }
    delete userFound.password
    await this.sysLogService.createLog(user, ActionsEnum.GET_ME_USER, 'profile retrieved')
    return userFound;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (user && user.password === password) {
      return user;
    }
    await this.sysLogService.createLog(user, ActionsEnum.GET_ME_USER, 'data retrived successfully')
    return null;
  }

  async update(id: string, updates:UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneById(id);

    try {
      const updatedUser = await this.userRepository.update(id, updates);
      await this.sysLogService.createLog(existingUser, ActionsEnum.UPDATE_ME_USER, 'data updated successfully')
      delete existingUser.password
      return existingUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('User with this email already exists.');
      }
      throw error;
    }
  }

  async deleteUser(req:RequestWithUser): Promise<boolean> {
    const user = await this.userRepository.findOneById(req.user.id);
    await this.userRepository.remove(user);
    await this.sysLogService.createLog(user,ActionsEnum.DELETE_ME_USER,'user removed successfully')
    return true
  }
 /**
   * Verifies the code coming from the user in case of email verification.
   * @param {String} code
   */
  async verifyEmailToken(code: string) {
    const user = await this.userRepository.findOne({ where: { verificationCode: code } });
    if (user) {
     
    return  await this.userRepository.update({ id: user.id }, {
            emailVerified: true,
            status: ProfileStatusEnum.VERIFIED,
          });
    }
    else throw new UnauthorizedException('Invalid token');
}
 
}
