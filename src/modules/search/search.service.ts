import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exhibition } from '../exhibitions/schemas/exhibition.schema';
import { Museum } from '../museums/schemas/museum.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Exhibition.name)
    private readonly exhibitionModel: Model<Exhibition>,
    @InjectModel(Museum.name) private readonly museumModel: Model<Museum>,
  ) {}

  async search(option: string, keyword: string): Promise<object> {
    switch (option) {
      case 'museum':
        return await this.searchMuseum(keyword);
      case 'exhibition':
        return await this.searchExhibition(keyword);
      default:
        throw new BadRequestException();
    }
  }

  async searchMuseum(keyword: string) {
    const museumResults = await this.museumModel.find({
      name: new RegExp(keyword),
    });

    return museumResults;
  }

  async searchExhibition(keyword: string) {
    const options = [
      { title: new RegExp(keyword) },
      { place: new RegExp(keyword) },
    ];
    const exhibitionResults = await this.exhibitionModel.find({
      $or: options,
    });

    return exhibitionResults;
  }
}
