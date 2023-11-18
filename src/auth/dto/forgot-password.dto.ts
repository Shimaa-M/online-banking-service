import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'super@admin.com' })
  email: string;
}
