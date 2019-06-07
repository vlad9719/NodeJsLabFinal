import { BadRequestException, Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { PhotoForPostParams } from './validation/photo.for.post.params';
import { AuthGuard } from '@nestjs/passport';
import { PhotoForCommentParams } from './validation/photo.for.comment.params';
import { Photo } from '../entities/photo.entity';

@Controller('/api/photos')
// @UseGuards(AuthGuard('jwt'))
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
  async addPhotoForPost(@Param() params: PhotoForPostParams, @UploadedFile() file) {
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
  async addPhotoForComment(@Param() params: PhotoForCommentParams, @UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('Please provide a file in the request');
    }

    return await this.photosService.addPhotoForComment(file.filename, params.commentId);
  }

  @Get('download/post/:postId')
  async getPhotoForPost(@Param() params: PhotoForPostParams, @Res() response) {
    const photo: Photo = await this.photosService.findPhotoByPostId(params.postId);
    response.sendFile(photo.url, { root: 'storage' });
  }

  @Get('download/comment/:commentId')
  async getPhotoForComment(@Param() params: PhotoForCommentParams, @Res() response) {
    const photo: Photo = await this.photosService.findPhotoByCommentId(params.commentId);
    response.sendFile(photo.url, { root: 'storage' });
  }
}
