import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exhibition } from './schemas/exhibition.schema';

@Injectable()
export class ExhibitionService {
  constructor(
    @InjectModel(Exhibition.name)
    private readonly exhibitionModel: Model<Exhibition>,
  ) {}

  async findById(id: string): Promise<Exhibition> {
    return this.exhibitionModel.findOne({ id }).lean();
  }

  async findRightItems(
    endDate: Date,
    reponseInfo: string,
  ): Promise<Exhibition | Exhibition[]> {
    return this.exhibitionModel
      .find(
        {
          'period.0': {
            $lte: endDate,
          },
          'period.1': {
            $gte: endDate,
          },
        },
        reponseInfo,
      )
      .lean();
  }

  async pagination(page: number): Promise<Exhibition[]> {
    const perPage = 9;
    // const total = await this.exhibitionModel.countDocuments({});
    return (
      this.exhibitionModel
        .find()
        // .sort({ createdAt: 1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .lean()
    );
  }

  async searchExhibition(keyword: string): Promise<Exhibition[]> {
    const options = [
      { title: new RegExp(keyword) },
      { place: new RegExp(keyword) },
    ];

    return this.exhibitionModel
      .find({
        $or: options,
      })
      .lean();
  }
}
