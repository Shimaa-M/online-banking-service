import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsEmail, IsIn, IsString, IsStrongPassword } from 'class-validator';
import { SignUpDto } from '../../auth/dto';
import { RoleGroups, RolesEnum } from '../enums/roles.enum';
import { Transform } from 'class-transformer';

export class CreateUserDto {
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
  @IsIn(RoleGroups.PROFILE)
  role: RolesEnum;
}
