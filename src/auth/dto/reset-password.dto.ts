import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { randomBytes } from 'crypto';
import { IsStrongPassword } from '../../core/decorators';

export class ResetPasswordDto {
  @IsString()
  @MinLength(50)
  @MaxLength(75)
  @ApiProperty({ example: randomBytes(32).toString('hex') })
  code: string;

  @IsStrongPassword()
  @ApiProperty({ example: 'newP@ssw0rd' })
  newPassword: string;
}
