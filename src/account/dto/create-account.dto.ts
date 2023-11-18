import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsIn, IsNumber, IsString, ValidateNested } from 'class-validator';
import { AccountTypeEnum } from '../enums/account-type.enum';

export class CreateAccountDto {
  @IsString()
  @ApiProperty({ example: '4242424242424242' })
  cardID: string;
  @IsString()
  @ApiProperty({ example: 'Shimaa Mahmoud' })
  accountHolderName: string;
  @IsEnum(AccountTypeEnum)
  @ApiProperty()
  accountType: AccountTypeEnum;
}
