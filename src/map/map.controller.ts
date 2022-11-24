import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private mapService: MapService) {}

  @Get('/:guid')
  async getMapInfo(@Param('guid') id: string, @Res() res): Promise<object> {
    const mapData = this.mapService.findMap(id);
    return await res.status(200).json(mapData);
  }

  @Get('/:guid/pins')
  async getPin(@Param('guid') id: string, @Res() res): Promise<object> {
    const pinData = this.mapService.findPlace(id);
    return await res.status(200).json(pinData);
  }
}
