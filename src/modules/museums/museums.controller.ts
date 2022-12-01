import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Museum } from './schemas/museum.schema';
import { MuseumService } from './museums.service';
import { GetMuseumDto } from './dto/getMuseum.dto';
import { GetMuseumPagenationDto } from './dto/getMuseumPagenation.dto';

@ApiTags('Museum')
@Controller('museums')
export class MuseumController {
  constructor(private readonly museumService: MuseumService) {}

  // @ApiOperation({ summary: '박물관/전시관 전체 목록' })
  // @Get()
  // async getMuseums(): Promise<Museum[]> {
  //   const museums = await this.museumService.findAll();
  //   return museums;
  // }

  @ApiOperation({ summary: '박물관/전시관 상세' })
  @ApiOkResponse({
    description: 'id값과 동일한 박물관/전시관의 상세 데이터를 반환합니다.',
  })
  @ApiNotFoundResponse({ description: 'NotFound' })
  @Get('/:id')
  async getMuseum(@Param() getMuseumDto: GetMuseumDto): Promise<Museum> {
    const museum = await this.museumService.findById(getMuseumDto.id);
    return museum;
  }

  @ApiOperation({ summary: '박물관/전시관 목록 9개씩' })
  @ApiOkResponse({
    description:
      'page의 값에 위치한 박물관/전시관 목록 9개의 데이터를 반환합니다.',
  })
  @ApiNotFoundResponse({ description: 'NotFound' })
  @Get()
  async listMuseum(@Query() getMuseumPagenationDto: GetMuseumPagenationDto) {
    const listMuseum = await this.museumService.pagination(
      getMuseumPagenationDto.page,
    );
    return listMuseum;
  }
}
