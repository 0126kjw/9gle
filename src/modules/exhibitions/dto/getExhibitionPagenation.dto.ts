import { IsString } from 'class-validator';

export class GetExhibitionPagenationDto {
  /**
   * page
   * @example '1'
   */
  @IsString()
  page: number;
}
