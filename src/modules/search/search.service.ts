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
    let options = [];

    if (option === 'museum') {
      const museumResults = await this.museumModel.find({
        facility_name: new RegExp(keyword),
      });
      if (museumResults.length === 0) {
        throw new NotFoundException('검색결과가 존재하지 않습니다.');
      }
      return museumResults;
    } else if (option === 'exhibition') {
      options = [
        { title: new RegExp(keyword) },
        { place: new RegExp(keyword) },
      ];
      const exhibitionResults = await this.exhibitionModel.find({
        $or: options,
      });
      if (exhibitionResults.length === 0) {
        throw new NotFoundException('검색결과가 존재하지 않습니다.');
      }
      return exhibitionResults;
    } else {
      throw new BadRequestException();
    }
  }
}
