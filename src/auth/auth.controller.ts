import {
    Controller,
    Post,
    Req,
    Body,
    UseGuards,
    HttpCode,
    HttpStatus,
    Get,
    Param,
    Res,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
  import { Response } from 'express';
  import { RequestWithUser } from '../core/interfaces';
  import { AuthService } from './auth.service';
  import { SignUpDto, SigninDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
  import { LocalAuthGuard, JwtAuthGuard, JwtRefreshGuard } from './guards';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private authService:AuthService,
    )
    {}

    @Post('/signup')
  @ApiOperation({ summary: 'Create a new user with email' })
    async signUp(@Req() req: RequestWithUser, @Res() res: Response, @Body() signUpDto: SignUpDto) {
    req.user = await this.authService.signUpWithPassword(signUpDto);
    this.authService.addJwtToCookie(req);
    this.authService.addJwtRefreshToCookie(req, res);
      
    res.send({
      accessToken: req.session.jwt as string,
      refreshToken: req.session.jid as string,
      user: req.user,
    });
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  @ApiOperation({ summary: 'Login user with email and password' })
  @ApiBody({ type: SigninDto })
  async signIn(@Req() req: RequestWithUser, @Res() res: Response) {
    this.authService.addJwtToCookie(req);
    this.authService.addJwtRefreshToCookie(req, res);

    delete req.user.password;

    res.send({
      accessToken: req.session.jwt as string,
      refreshToken: req.session.jid as string,
      user: req.user,
    });
  }
  @Get('/logout')
  @ApiOperation({ summary: 'Logout user from current device' })
  public logOut(@Req() req: RequestWithUser) {
    req.session = null;
    return true;
  }
  @Get('/verify-email/:code')
  @ApiOperation({ summary: 'Verify email' })
  async verifyEmail(@Param('code') code: string) {
    return await this.authService.verifyEmail(code);
  }
}
