import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import * as formidable from 'formidable';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async findAllImage(): Promise<object> {
    return await v2.api.resources().then((result) => {
      console.log(result);
      return result;
    });
  }

  async findImage(publicId: string): Promise<object> {
    return await v2.api.resource(publicId).then((result) => {
      console.log(result);
      return result;
    });
  }
}
