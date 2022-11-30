import { IsString } from 'class-validator';

export class GetExhibitionDto {
  /**
   * id
   * @example '6386bc3ac151f331566bc59a'
   */
  @IsString()
  id: string;
}
