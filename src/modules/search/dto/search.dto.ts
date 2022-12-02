import { IsString } from 'class-validator';

export class searchDTO {
  /**
   * 구분 (exhibition/museum)
   * @example 'exhibition'
   */
  @IsString()
  option: string;

  /**
   * 검색 키워드
   * @example '국립중앙'
   */
  @IsString()
  keyword: string;
}
