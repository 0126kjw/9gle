import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exhibition } from '../schemas/exhibition.schema';
import { Cron } from '@nestjs/schedule';
import { crawlExhibitions } from '../crawling/exhibition.crawling';

@Injectable()
export class ExhibitionScheduler {
  constructor(
    @InjectModel(Exhibition.name)
    private readonly exhibitionModel: Model<Exhibition>,
  ) {}

  @Cron('59 59 23 * * *')
  async handleCron() {
    const list = await crawlExhibitions();
    const exhibitionCreated = await this.exhibitionModel.create(list);

    if (!exhibitionCreated) {
      throw new Error('크롤링 업데이트 실패');
    }
  }
}
