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

  async findById(id: number): Promise<Museum> {
    return this.museumModel.findOne({ id }).lean();
  }

  async findOne(facilityName: string, reponseInfo: string): Promise<Museum> {
    return this.museumModel.findOne({ name: facilityName }, reponseInfo).lean();
  }

  async findRightItems(
    address: string,
    category: string,
    reponseInfo: string,
  ): Promise<Museum | Museum[]> {
    return this.museumModel
      .find({ oldAddress: { $regex: address }, category }, reponseInfo)
      .lean();
  }

  async pagination(page: number): Promise<Museum[]> {
    const perPage = 9;
    // const total = await this.museumModel.countDocuments({});
    // console.log(total);
    return this.museumModel
      .find({})
      .skip(perPage * (page - 1))
      .limit(perPage)
      .lean();
  }

  async searchMuseum(keyword: string): Promise<Museum[]> {
    return this.museumModel
      .find({
        name: new RegExp(keyword),
      })
      .lean();
  }
}
