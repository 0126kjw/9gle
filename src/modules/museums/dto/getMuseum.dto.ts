import { IsString } from 'class-validator';

export class GetMuseumDto {
  /**
   * id
   * @example '63883df468afe23d63820501'
   */
  @IsString()
  id: string;
}
