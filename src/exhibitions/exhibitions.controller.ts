import { Controller, Get, Param, Query } from '@nestjs/common';
import { Exhibition } from './schemas/exhibition.schema';
import { ExhibitionService } from './exhibitions.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Exhibition')
@Controller('exhibitions')
export class ExhibitionController {
  constructor(private readonly exhibitionService: ExhibitionService) {}

  // @ApiOperation({ summary: '전시회 전체 목록' })
  // @Get()
  // async getExhibitions(): Promise<Exhibition[]> {
  //   const exhibitions = await this.exhibitionService.findAll();
  //   return exhibitions;
  // }

  @ApiOperation({ summary: '전시회 상세' })
  @ApiParam({ name: 'id', example: '638461231109a1abdb7ed797' })
  @Get('/:id')
  async getExhibition(@Param('id') id: string): Promise<Exhibition> {
    const exhibition = await this.exhibitionService.findById(id);
    return exhibition;
  }

  @ApiOperation({ summary: '전시회 목록 18개씩' })
  @ApiQuery({ name: 'page', example: 1 })
  @Get()
  async listExhibition(@Query('page') page: number) {
    const listExhibition = await this.exhibitionService.pagination(page);
    return listExhibition;
  }
}
