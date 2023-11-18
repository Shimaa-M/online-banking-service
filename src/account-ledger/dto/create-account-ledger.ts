import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountLedgerDto {
  @IsString()
  @ApiProperty({example: '4242424242424242'})
  cardID:string
  @IsNumber()
  @ApiProperty()
  amount: number;
  @IsOptional()
  @IsString()
  @ApiProperty()
  comments?: string;
}
