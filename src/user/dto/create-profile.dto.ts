import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';
import { RoleGroups, RolesEnum } from '../enums/roles.enum';

export class CreateProfileDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({ example: 'hemedah94@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'abdallah' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'hemedah' })
  lastName: string;

  @IsIn(RoleGroups.PROFILE)
  role: RolesEnum;
}
