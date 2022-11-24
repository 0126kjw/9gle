import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MapService } from './map.service';

@ApiTags('Map')
@Controller('map')
export class MapController {
  constructor(private mapService: MapService) {}

  @ApiOperation({ summary: '자치구 데이터 가져오기' })
  @ApiParam({
    name: 'guid',
    example: '63441a58be26106c41c6d736',
  })
  @ApiResponse({
    status: 200,
    description: 'guid 값과 동일한 자치구의 데이터를 반환한다.',
  })
  @ApiResponse({ status: 404, description: 'NotFound' })
  @Get('/:guid')
  async getMapInfo(@Param('guid') id: string, @Res() res): Promise<void> {
    const mapData = this.mapService.findMap(id);
    await mapData.then((data) => {
      return res.status(200).json(data);
    });
  }

  @ApiOperation({ summary: '자치구 별 모든 장소 조회' })
  @ApiParam({
    name: 'guid',
    example: '63441a58be26106c41c6d736',
  })
  @ApiResponse({
    status: 200,
    description: 'guid 값과 동일한 자치구의 장소 데이터를 반환한다.',
  })
  @ApiResponse({ status: 404, description: 'NotFound' })
  @Get('/:guid/pins')
  async getPin(@Param('guid') id: string, @Res() res): Promise<void> {
    const pinData = this.mapService.findPlace(id);
    await pinData.then((data) => {
      return res.status(200).json(data);
    });
  }
}
