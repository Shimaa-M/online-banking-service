import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import { RoleGroups, RolesEnum } from 'src/user/enums/roles.enum';
import { IsStrongPassword } from '../../core/decorators';

export class SignUpDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'engshimaamahmoud@gmail.com' })
  email: string;

  /** Password must be at least 8 characters and include one lowercase letter, one uppercase letter, and one digit. */
  @IsStrongPassword()
  @ApiProperty({ example: 'P@ssw0rd' })
  password: string;
  
  @IsString()
  @ApiProperty({ example: '01062153790' })
  phoneNumber: string;

  @IsString()
  @ApiProperty({ example: 'Shimaa Mahmoud' })
  name: string;
}
