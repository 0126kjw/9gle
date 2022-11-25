import { Controller, Get, Param, Res } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { getMapInfo } from './dto/getMapInfo.dto';
import { getPin } from './dto/getPin.dto';
import { MapService } from './map.service';

@ApiTags('Map')
@Controller('map')
export class MapController {
  constructor(private mapService: MapService) {}

  @ApiOperation({ summary: '자치구 데이터 가져오기' })
  @ApiOkResponse({
    description: 'guid 값과 동일한 자치구의 데이터를 반환한다.',
  })
  @ApiNotFoundResponse({ description: 'NotFound' })
  @Get('/:guid')
  async getMapInfo(
    @Param() getMapInfoDto: getMapInfo,
    @Res() res,
  ): Promise<void> {
    const mapData = this.mapService.findMap(getMapInfoDto.guid);
    await mapData.then((data) => {
      return res.status(200).json(data);
    });
  }

  @ApiOperation({ summary: '자치구 별 모든 장소 조회' })
  @ApiOkResponse({
    description: 'guid 값과 동일한 자치구의 장소 데이터를 반환한다.',
  })
  @ApiNotFoundResponse({ description: 'NotFound' })
  @Get('/:guid/pins')
  async getPin(@Param() getPinDto: getPin, @Res() res): Promise<void> {
    const pinData = this.mapService.findPlace(getPinDto.guid);
    await pinData.then((data) => {
      return res.status(200).json(data);
    });
  }
}
