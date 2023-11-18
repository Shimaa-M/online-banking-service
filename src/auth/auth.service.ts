import {
    Injectable,
    InternalServerErrorException,
    BadRequestException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcryptjs';
  import { Response } from 'express';
  import { ConfigService } from '../config/config.service';
  import { InvalidCredentialsException } from '../core/exceptions';
  import { RequestWithUser } from '../core/interfaces';
  import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { SysLogService } from '../sys-log/sys-log.service';
  import { SignUpDto, SigninDto} from './dto';
  import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ProfileStatusEnum } from '../user/enums/profile-status.enum';

import { ActionsEnum } from '../sys-log/enums/actions.enums';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
        private readonly syslogService:SysLogService
      ) {}
    async signUpWithPassword(signUpDto: SignUpDto): Promise<User> {
        return await this.userService.createWithPassword(signUpDto);
    }
    async validateUserPassword({ email, password }: SigninDto) {
      // Check user with <email> exists
      const userDoc = await this.userService.findByEmail(email);
      if (!userDoc) {
        throw new InvalidCredentialsException();
      }
  
      if (!(await bcrypt.compare(password, userDoc.password))) {
        // Passwords mismatch
        throw new InvalidCredentialsException();
      }
  
      //await userDoc.save();
      if (!userDoc.emailVerified && userDoc.status != ProfileStatusEnum.VERIFIED) {
        throw new BadRequestException('Please verify your account first')
      }
      this.syslogService.createLog(
        userDoc,
       ActionsEnum.LOGIN,
       `Customer with ID ${userDoc.id} logged in`
     );
      return userDoc;
    }
 /**
   * Generate a new JWT Access token with payload.
   */
 public generateJwtAccessToken(record: Partial<User>): { accessToken: string } {
    const payload: JwtPayload = { id: record.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.jwtAccessTokenSecret,
      expiresIn: this.configService.jwtAccessTokenExpiry,
    });

    return { accessToken };
  }

  /**
   * Generate a new JWT Refresh token with payload.
   */
  public generateJwtRefreshToken(record: Partial<User>): { refreshToken: string } {
    const payload: JwtPayload = { id: record.id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.jwtRefreshTokenSecret,
      expiresIn: this.configService.jwtRefreshTokenExpiry,
    });

    return { refreshToken };
  }

  public addJwtToCookie(req: RequestWithUser) {
    try {
      req.session.jwt = this.generateJwtAccessToken(req.user).accessToken;
    } catch (err) {
      throw new InternalServerErrorException(err, 'Problem with cookie-session middleware?');
    }
  }

  public addJwtRefreshToCookie(req: RequestWithUser, res: Response) {
    try {
      const token = this.generateJwtRefreshToken(req.user).refreshToken;
      req.session.jid = token;
      res.cookie('jid', token, { httpOnly: true });
    } catch (err) {
      throw new InternalServerErrorException(err, 'Problem with cookie-session middleware?');
    }
  }    
  async verifyEmail(code: string){

    return await this.userService.verifyEmailToken(code)
   
    //delete user.password;
    //return user;
  }
}
