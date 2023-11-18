import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ProfileStatusEnum, ProfileStatusGroup } from 'src/user/enums/profile-status.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUserPassword({ email, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    
    // Disable archived and suspended accounts
    if (ProfileStatusGroup.DISABLED.includes(user.status)) {
      throw new ForbiddenException('This profile is not longer active');
    }
    
    return user;
  }
}
