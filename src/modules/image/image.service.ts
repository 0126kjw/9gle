import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ImageService {
  constructor(private cloudinary: CloudinaryService) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }

  async findAllImageToCloudinary() {
    return await this.cloudinary.findAllImage();
  }

  async findImageToCloudinary(publicId: string) {
    return await this.cloudinary.findImage(publicId);
  }
}
