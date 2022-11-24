import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private mapService: MapService) {}

  @Get('/:guid')
  async getMapInfo(@Param('guid') id: string, @Res() res): Promise<void> {
    const mapData = this.mapService.findMap(id);
    await mapData.then((data) => {
      return res.status(200).json(data);
    });
  }

  @Get('/:guid/pins')
  async getPin(@Param('guid') id: string, @Res() res): Promise<void> {
    const pinData = this.mapService.findPlace(id);
    await pinData.then((data) => {
      return res.status(200).json(data);
    });
  }
}
