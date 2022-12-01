import { IsString } from 'class-validator';

export class GetMuseumPagenationDto {
  /**
   * page
   * @example '1'
   */
  @IsString()
  page: number;
}
