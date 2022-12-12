import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetExhibitionPagenationDto {
  /**
   * page
   * @example 1
   */
  @IsNumber()
  @Type(() => Number)
  page: number;
}
