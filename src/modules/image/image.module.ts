import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [CloudinaryModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
