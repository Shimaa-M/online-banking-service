import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '../../config/config.service';
import { UserService } from '../../user/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractRefreshFromCookie]),
      ignoreExpiration: false,
      secretOrKey: configService.jwtRefreshTokenSecret,
    });
  }

  // async validate(payload: JwtPayload) {
  //   const { id, version } = payload;
  //   return await this.usersService.findOne(
  //     { id: toObjectId(id), tokenVersion: version },
  //     //{ password: 0 },
  //   );
  // }
}

export function extractRefreshFromCookie(req: Request): string {
  return req?.session?.jid || req?.cookies?.jid || null;
}
