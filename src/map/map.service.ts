import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Map, MapDocument } from './schemas/map.schema';

@Injectable()
export class MapService {
  constructor(@InjectModel(Map.name) private mapModel: Model<MapDocument>) {}

  async findMap(id: string): Promise<object> {
    const map = await this.mapModel.findOne({ _id: id });
    if (!map) {
      throw new NotFoundException('id 값이 존재하지 않습니다.');
    }
    return map;
  }

  async findPlace(id: string): Promise<object> {
    const map = await this.mapModel.findOne({ _id: id });
    if (!map) {
      throw new NotFoundException('id 값이 존재하지 않습니다.');
    }
    return map.pins;
  }
}
