import { BadRequestException, Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { PhotosParams } from './validation/photos.params';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/photos')
export class PhotosController {

  constructor(
    private readonly photosService: PhotosService,
  ) {
  }

  @Post('/upload/post/:postId')
  @UseInterceptors(FileInterceptor('file', {
      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, `storage`);
        },
        filename(req, file, cb) {
          cb(null, `${Date.now()}_${file.originalname}`);
        },
      }),
    },
  ))
  @UseGuards(AuthGuard('jwt'))
  async addPhotoForPost(@Param() params: PhotosParams, @UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('Please provide a file in the request');
    }
    return await this.photosService.addPhotoForPost(file.filename, params.postId);
  }

}
