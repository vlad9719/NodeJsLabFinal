import { Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './validation/dto/create.post.dto';
import { CreatePostParams } from './validation/params/create.post.params';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/posts')
export class PostsController {

  constructor(
    private readonly postsService: PostsService,
  ) {}

  @Post('/new/:userId')
  @UseGuards(AuthGuard('jwt'))
  async addPost(@Param() params: CreatePostParams, @Body() createPostDto: CreatePostDto) {
    return await this.postsService.addPost(params.userId, createPostDto.text, createPostDto.mentionedIds, createPostDto.hashtags);
  }
}
