import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ExhibitionModule } from './modules/exhibitions/exhibitions.module';
import { MuseumModule } from './modules/museums/museums.module';
import { MapModule } from './modules/map/map.module';
import { SearchModule } from './modules/search/search.module';

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
