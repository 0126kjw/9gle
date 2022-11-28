import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ExhibitionModule } from './exhibitions/exhibitions.module';
import { MuseumModule } from './museums/museums.module';
import { MapModule } from './map/map.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MuseumModule,
    ExhibitionModule,
    MapModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
