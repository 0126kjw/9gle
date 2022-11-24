import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapModule } from './map/map.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [ConfigurationModule, MapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
