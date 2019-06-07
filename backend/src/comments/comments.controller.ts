import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentParams } from './validation/params/create.comment.params';
import { CreateCommentDto } from './validation/dto/create.comment.dto';

@Controller('/api/comments')
export class CommentsController {

  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  @Post('/new/:userId/:postId')
  @UseGuards(AuthGuard('jwt'))
  async addComment(@Param() params: CreateCommentParams, @Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.addComment(params.userId, params.postId, createCommentDto.text, createCommentDto.mentionedIds);
  }
}
