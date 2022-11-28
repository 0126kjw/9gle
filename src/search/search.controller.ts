import { Controller, Get, Query } from '@nestjs/common';
import { search } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  async search(@Query() searchDto: search): Promise<object> {
    const searchData = await this.searchService.search(
      searchDto.option,
      searchDto.keyword,
    );
    return searchData;
  }
}
