import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {Response} from 'express'
import { SignUpDto } from './dto';
import { RequestWithUser } from '../core/interfaces';
import { JwtService } from '@nestjs/jwt';

jest.mock('./auth.service');
jest.mock('@nestjs/jwt');
describe('AuthController', () => {
  let controller: AuthController;
  let authService,
    req: RequestWithUser,
    res:Response;
    let jwtService;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService],
    }).compile().catch((e) => e);

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /auth/signup', () => {
    it('should call authService.signUpWithPassword', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@test.com',
        password: 'TestPassword',
        phoneNumber: '010106080902',
        name: 'test user'
      };
      const result = await controller.signUp(req,res,signUpDto).catch((e)=>e);

      expect(authService.signUpWithPassword).toHaveBeenCalledWith(signUpDto);
      expect(result).toBeTruthy();
    });
  });

  // describe('POST /auth/signin', () => {
  //   it('should call authService.generateJwtToken and return a token',async  () => {
  //     jest.spyOn(authService.generateJwtToken,'get').mockReturnValueOnce({
  //       accessToken: 'mock.jwt',
  //     });
  //     const req: any = {
  //       user: {
  //         email: 'test@test.com',
  //         password: 'TestPassword'
  //       },
  //       session: {},
  //       res: { redirect: jest.fn() },
  //     };
  //     const result =await controller.signIn(req,res);

  //     expect(authService.generateJwtToken).toHaveBeenCalledWith(req.user);
  //     expect(req.session).toMatchInlineSnapshot(`
  //       Object {
  //         "jwt": "mock.jwt",
  //       }
  //     `);
  //     expect(req.res.redirect).not.toHaveBeenCalled();
  //     expect(result).toMatchInlineSnapshot(`
  //       Object {
  //         "token": "mock.jwt",
  //         "user": Object {
  //           "email": "test@test.com",
  //         },
  //       }
  //     `);
  //   });

  //   it('should throw InternalServerErrorException if no session',  () => {
  //     jest.spyOn(authService.generateJwtToken,'get').mockReturnValueOnce({
  //       accessToken: 'mock.jwt',
  //     });
  //     const req: any = {
  //       user: {
  //         email: 'test@test.com',
  //       },
  //       res: { redirect: jest.fn() },
  //     };

  //     let result;
  //     let error;
  //     try {
  //       result = controller.signIn(req,res);
  //     } catch (err) {
  //       error = err;
  //     }

  //     expect(authService.generateJwtToken).toHaveBeenCalledWith(req.user);
  //     expect(req.session).toBeUndefined();
  //     expect(req.res.redirect).not.toHaveBeenCalled();
  //     expect(error).toBeInstanceOf(InternalServerErrorException);
  //     expect(result).toBeUndefined();
  //   });
  // });

  describe('POST /auth/logout', () => {
    it('should set session to null', async () => {
      const req: any = {
        session: {
          Id: 'mockUuid',
        },
        res: { redirect: jest.fn() },
      };

      const result = controller.logOut(req);

      expect(req.session).toBeNull();
      expect(result).toBeTruthy();
    });
  });

  describe('GET /verify-email/:code', () => {
    it('should call authService.verifyEmail', async () => {
      const code = 'mock-code';
      authService.verifyEmail.mockResolvedValueOnce(true);
      await controller.verifyEmail(code);

      expect(authService.verifyEmail).toHaveBeenCalledWith(code);
      expect(authService.verifyEmail).toHaveBeenCalledTimes(1);
    });

    it('should throw error if unauthorized or code is no longer valid', async () => {
      const code = 'mock-code';
      authService.verifyEmail.mockResolvedValueOnce(new UnauthorizedException());
      await controller.verifyEmail(code).catch((e) => e);

      expect(authService.verifyEmail).toHaveBeenCalledWith(code);
      expect(authService.verifyEmail).toHaveBeenCalledTimes(1);
    });
  });
});
