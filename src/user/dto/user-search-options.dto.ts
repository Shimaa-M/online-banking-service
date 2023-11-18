import { Transform } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';
import { SearchOptions } from '../../core/shared';

export class UserSearchOptions extends SearchOptions {
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  lastConnectionFrom?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  lastConnectionTo?: Date;
}
