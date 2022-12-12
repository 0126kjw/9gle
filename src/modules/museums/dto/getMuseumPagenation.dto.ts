import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetMuseumPagenationDto {
  /**
   * page
   * @example 1
   */
  @IsNumber()
  @Type(() => Number)
  page: number;
}
