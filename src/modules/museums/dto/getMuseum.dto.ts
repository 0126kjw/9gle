import { IsString } from 'class-validator';

export class GetMuseumDto {
  /**
   * id
   * @example '1'
   */
  @IsString()
  id: number;
}
