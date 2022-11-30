import { Controller, Get, Param, Query } from '@nestjs/common';
import { Exhibition } from './schemas/exhibition.schema';
import { ExhibitionService } from './exhibitions.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetExhibitionDto } from './dto/getExhibition.dto';
import { GetExhibitionPagenationDto } from './dto/getExhibitionPagenation.dto';

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
  @ApiOkResponse({ description: 'id값과 동일한 자치구의 데이터를 반환합니다.' })
  @ApiNotFoundResponse({ description: 'NotFound' })
  @Get('/:id')
  async getExhibition(
    @Param('id') getExhibitionDto: GetExhibitionDto,
  ): Promise<Exhibition> {
    const exhibition = await this.exhibitionService.findById(
      getExhibitionDto.id,
    );
    return exhibition;
  }

  @ApiOperation({ summary: '전시회 목록 9개씩' })
  @ApiOkResponse({
    description: 'page의 값에 위치한 9개의 데이터를 반환합니다.',
  })
  @ApiNotFoundResponse({ description: 'NotFound' })
  @Get()
  async listExhibition(
    @Query('page') getExhibitionPagenationDto: GetExhibitionPagenationDto,
  ) {
    const listExhibition = await this.exhibitionService.pagination(
      getExhibitionPagenationDto.page,
    );
    return listExhibition;
  }
}
