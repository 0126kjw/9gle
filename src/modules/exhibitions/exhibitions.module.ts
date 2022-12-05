import { Module } from '@nestjs/common';
import { ExhibitionController } from './exhibitions.controller';
import { ExhibitionService } from './exhibitions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Exhibition, ExhibitionSchema } from './schemas/exhibition.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { ExhibitionScheduler } from './scheduler/exhibitions.scheduler';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Exhibition.name, schema: ExhibitionSchema },
    ]),
  ],
  controllers: [ExhibitionController],
  providers: [ExhibitionService, ExhibitionScheduler],
  exports: [ExhibitionService],
})
export class ExhibitionModule {}
