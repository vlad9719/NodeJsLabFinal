import { BadRequestException, Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async addComment(userId: number, postId: number, text: string, mentionedIds: number[]): Promise<Comment> {

    const user: User = await this.usersService.findUserById(userId);

    const post: Post = await this.postsService.findPostById(postId);

    let mentioned: User[] = [];
    if (mentionedIds) {
      mentioned = await this.usersService.findUsersByIds(mentionedIds);
    }

    return await this.commentsRepository.save({
      text,
      createdAt: new Date(),
      post,
      user,
      mentioned,
    });
  }

  async findCommentById(commentId: number): Promise<Comment> {
    return this.commentsRepository.findOneOrFail(commentId)
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find comment with id '${commentId}'`);
        }

        throw new Error(reason);
      });
  }

}
