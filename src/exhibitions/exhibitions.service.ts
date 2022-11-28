import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exhibition } from './schemas/exhibition.schema';
import { Cron } from '@nestjs/schedule';
import { exhibitionList } from '../crawlings/crawlings.interpark_exhibition_rank';

@Injectable()
export class ExhibitionService {
  private readonly logger = new Logger(ExhibitionService.name);
  constructor(
    @InjectModel(Exhibition.name)
    private readonly exhibitionModel: Model<Exhibition>,
  ) {}

  async findAll(): Promise<Exhibition[]> {
    const exhibitions = await this.exhibitionModel.find();
    return exhibitions;
  }

  async findById(id: string): Promise<Exhibition> {
    const exhibition = await this.exhibitionModel.findOne({ id });
    return exhibition;
  }

  async pagination(page: number) {
    const perPage = 18;
    // const total = await this.exhibitionModel.countDocuments({});
    const exhibitions = await this.exhibitionModel
      .find({})
      // .sort({ createdAt: 1 })
      .skip(perPage * (page - 1))
      .limit(perPage);

    return exhibitions;
  }

  @Cron('59 59 23 * * *')
  async handleCron() {
    const list = await exhibitionList();
    const deleted = await this.exhibitionModel.deleteMany();

    if (!deleted) {
      throw new Error('진서회 데이터 삭제 실패');
    }

    const exhibitionCreated = await this.exhibitionModel.create(list);

    if (!exhibitionCreated) {
      throw new Error('크롤링 업데이트 실패');
    }
  }
}
