import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Museum } from './schemas/museum.schema';

@Injectable()
export class MuseumService {
  constructor(
    @InjectModel(Museum.name)
    private readonly museumModel: Model<Museum>,
  ) {}

  async findAll(): Promise<Museum[]> {
    const museums = await this.museumModel.find();
    return museums;
  }

  async findById(id: string): Promise<Museum> {
    const museum = await this.museumModel.findOne({ id });
    return museum;
  }

  async pagination(page: number) {
    const perPage = 9;
    // const total = await this.museumModel.countDocuments({});
    // console.log(total);
    const museums = await this.museumModel
      .find({})
      .skip(perPage * (page - 1))
      .limit(perPage);

    return museums;
  }

  async searchMuseum(keyword: string) {
    const museumResults = await this.museumModel.find({
      name: new RegExp(keyword),
    });

    return museumResults;
  }
}
