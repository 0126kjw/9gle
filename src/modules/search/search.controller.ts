import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { searchDTO } from './dto/search.dto';
import { searchTitleDTO } from './dto/searchTitle.dto';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @ApiOperation({ summary: '검색 기능' })
  @Get()
  async search(@Query() searchDto: searchDTO): Promise<object> {
    const searchData = await this.searchService.search(
      searchDto.option,
      searchDto.keyword,
    );
    return searchData;
  }

  @Get('/recommend')
  async searchTitle(@Query() searchTitleDto: searchTitleDTO): Promise<object> {
    const searchData = await this.searchService.searchTitle(
      searchTitleDto.keyword,
    );
    return searchData;
  }
}
