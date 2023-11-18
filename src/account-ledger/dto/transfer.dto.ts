import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateAccountLedgerDto } from "./create-account-ledger";
import { IsString } from "class-validator";

export class TransferLedgerDto extends PartialType(CreateAccountLedgerDto) { 
@IsString()
  @ApiProperty({example: '4444424242424242'})
  targetCardID:string
}