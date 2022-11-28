import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Exhibition,
  ExhibitionSchema,
} from 'src/exhibitions/schemas/exhibition.schema';
import { Museum, MuseumSchema } from 'src/museums/schemas/museum.schema';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Museum.name, schema: MuseumSchema }]),
    MongooseModule.forFeature([
      { name: Exhibition.name, schema: ExhibitionSchema },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
