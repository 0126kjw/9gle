import { Controller, Get, Param, Query } from '@nestjs/common';
import { Exhibition } from './schemas/exhibition.schema';
import { ExhibitionService } from './exhibitions.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetExhibitionDto } from './dto/getExhibition.dto';
import { GetExhibitionPagenationDto } from './dto/getExhibitionPagenation.dto';

@ApiTags('Exhibition')
@Controller('exhibitions')
export class ExhibitionController {
  constructor(private readonly exhibitionService: ExhibitionService) {}

  /**
   * 전시회 상세
   */
  @ApiOkResponse({
    description: 'id값과 동일한 전시회의 상세 데이터를 반환합니다.',
  })
  @ApiNotFoundResponse({ description: 'NotFound' })
  @Get('/:id')
  async getExhibition(
    @Param() getExhibitionDto: GetExhibitionDto,
  ): Promise<Exhibition> {
    return this.exhibitionService.findById(getExhibitionDto.id);
  }

  /**
   * 전시회 목록 9개씩
   */
  @ApiOkResponse({
    description: 'page의 값에 위치한 전시회 목록 9개의 데이터를 반환합니다.',
  })
  @ApiNotFoundResponse({ description: 'NotFound' })
  @Get()
  async listExhibition(
    @Query() getExhibitionPagenationDto: GetExhibitionPagenationDto,
  ) {
    const listExhibition = await this.exhibitionService.pagination(
      getExhibitionPagenationDto.page,
    );
    return listExhibition;
  }
}
