import { UnauthorizedException } from '@nestjs/common';

const message = 'invalid email or password';
export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super(message);
  }
}
