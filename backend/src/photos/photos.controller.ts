import { BadRequestException, Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { AddPhotoForPostParams } from './validation/add.photo.for.post.params';
import { AuthGuard } from '@nestjs/passport';
import { AddPhotoForCommentParams } from './validation/add.photo.for.comment.params';

@Controller('/api/photos')
@UseGuards(AuthGuard('jwt'))
export class PhotosController {

  private readonly storageOptions = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `storage`);
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });

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
  async addPhotoForPost(@Param() params: AddPhotoForPostParams, @UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('Please provide a file in the request');
    }
    return await this.photosService.addPhotoForPost(file.filename, params.postId);
  }

  @Post('upload/comment/:commentId')
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, `storage`);
      },
      filename(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
      },
    }),
  }))
  async addPhotoForComment(@Param() params: AddPhotoForCommentParams, @UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('Please provide a file in the request');
    }

    return await this.photosService.addPhotoForComment(file.filename, params.commentId);
  }
}
