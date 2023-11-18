import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'src/core/decorators';

export class CreatePasswordDto {
  /** Password must be at least 8 characters and include one lowercase letter, one uppercase letter, and one digit. */
  @IsStrongPassword()
  @ApiProperty({ example: 'P@ssw0rd' })
  password: string;
}
