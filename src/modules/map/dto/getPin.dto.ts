import { IsString } from 'class-validator';

export class getPin {
  /**
   * guid
   * @example '63441a58be26106c41c6d736'
   */
  @IsString()
  guid: string;
}
