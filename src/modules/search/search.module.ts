import { Module } from '@nestjs/common';
import { ExhibitionModule } from '../exhibitions/exhibitions.module';
import { MuseumModule } from '../museums/museums.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [MuseumModule, ExhibitionModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
