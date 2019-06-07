import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './validation/dto/create.post.dto';
import { CreatePostParams } from './validation/params/create.post.params';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { GetPostsByUserParams } from './validation/params/get.posts.by.user.params';

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

  @Get('/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getPostsByUser(@Param() params: GetPostsByUserParams) {
    return await this.postsService.findPostsByUserId(params.userId)
      .then(posts => {
        return { posts };
      });
  }
}
