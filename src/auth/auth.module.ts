import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../config/config.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy } from './strategies';
import { SysLogModule } from '../sys-log/sys-log.module';
import { OgmaModule } from '@ogma/nestjs-module';

@Module({
  imports: [
    ConfigModule.Deferred,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    OgmaModule.forFeature(AuthService),
    JwtModule.register({}),
    UserModule,
    SysLogModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
