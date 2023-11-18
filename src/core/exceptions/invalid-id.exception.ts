import { BadRequestException } from '@nestjs/common';

const message = 'id is not valid';
export class InvalidIdException extends BadRequestException {
  constructor() {
    super(message);
  }
}
