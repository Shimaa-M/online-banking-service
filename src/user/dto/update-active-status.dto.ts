import { IsBoolean } from 'class-validator';

export class UpdateActiveStatusDto {
  @IsBoolean()
  active: boolean;
}
