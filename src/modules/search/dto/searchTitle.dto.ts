import { IsString } from 'class-validator';

export class searchTitleDTO {
  /**
   * 검색 키워드
   * @example '국립중앙'
   */
  @IsString()
  keyword: string;
}
