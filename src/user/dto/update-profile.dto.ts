import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { SignUpDto } from '../../auth/dto';
import { IsStrongPassword } from '../../core/decorators';

export class UpdateProfileDto extends PartialType(
  PickType(SignUpDto, ['phoneNumber', 'name', 'email'] as const),
) {

  @IsOptional()
  @IsString()
  oldPassword?: string;

  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '+33700555378' })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'abdallah' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'hemedah' })
  lastName?: string;

}
