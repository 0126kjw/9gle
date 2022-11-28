import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Museum } from './schemas/museum.schema';
import { MuseumService } from './museums.service';

@ApiTags('Museum')
@Controller('museums')
export class MuseumController {
  constructor(private readonly museumService: MuseumService) {}

  @ApiOperation({ summary: '박물관/전시관 전체 목록' })
  @Get()
  async getMuseums(): Promise<Museum[]> {
    const museums = await this.museumService.findAll();
    return museums;
  }

  @ApiOperation({ summary: '박물관/전시관 상세' })
  @ApiParam({ name: 'id', example: '6384520144788f15a6cd386b' })
  @Get('/:id')
  async getMuseum(@Param('id') id: string): Promise<Museum> {
    const museum = await this.museumService.findById(id);
    return museum;
  }
}
