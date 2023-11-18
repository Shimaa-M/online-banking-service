import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsEmail()
  @ApiProperty({ example: 'engshimaamahmoud@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'P@ssw0rd' })
  password: string;
}
