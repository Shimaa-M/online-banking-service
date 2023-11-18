import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsIn,
  IsArray,
  IsNumber,
  IsOptional,
  Min,
  IsPositive,
  IsObject,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import moment from 'moment';
import { escapeRegexSpecialCharacters } from '../utils';

/**
 * Used to decide the pagination, search and filter in every search.
 */
export class SearchOptions {
  /**
   * Documents to skip.
   * @example 0
   */
  @IsNumber()
  @Min(0)
  offset: number;

  /**
   * Number of records to return in 1 page.
   * @example 10
   */
  @IsPositive()
  size: number;

  /**
   * Applies sort to the result according to the provided field.
   */
  @IsOptional()
  @IsString()
  sort? = '';

  /**
   * Sets the direction of sorting.
   * @example asc
   */
  @IsOptional()
  @IsIn(['asc', 'desc'])
  dir?: string;

  /**
   * Used to text search with the provide value.
   */
  @IsOptional()
  @IsString()
  @Transform(({ value }) => escapeRegexSpecialCharacters(value))
  searchTerm? = '';

  /**
   * Used to filter the results according to provided field/s.
   * `[{field: value}]`
   */
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({ example: [] })
  filterBy?: Record<string, any>[] = [];

  /**
   * Fields to select from the entity.
   */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: [] })
  attributesToRetrieve?: string[] = [];

  @IsOptional()
  @IsDateString()
  //@Transform(({ value }) => moment(value).add(2, 'hour').startOf('day').toISOString())
  //@ApiProperty({ type: Date, example: 'false' })
  filterByDateFrom: Date;

  @IsOptional()
  @IsDateString()
  //@Transform(({ value }) => moment(value).add(2, 'hour').startOf('day').toISOString())
  //@ApiProperty({ type: Date, example: 'false' })
  filterByDateTo: Date;
}
