import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import * as multer from 'multer';
import { UsersService } from '../users/users.service';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { HashtagsService } from '../hashtags/hashtags.service';
import { User } from '../entities/user.entity';
import { Hashtag } from '../entities/hashtag.entity';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
    private readonly hashtagService: HashtagsService,
  ) {}

  async addPost(userId: number, text: string, mentionedIds: number[], hashtagsArray: string[]): Promise<Post> {

    const user: User = await this.usersService.findUserById(userId);

    let mentioned: User[] = [];
    if (mentionedIds) {
      mentioned = await this.usersService.findUsersByIds(mentionedIds);
    }

    const hashtags: Hashtag[] = [];
    if (hashtagsArray) {
      await hashtagsArray.forEach(async (hashtag) => {
        const newHashtag = await this.hashtagService.findOrCreateHashtag(hashtag);
        await hashtags.push(newHashtag);
      });
    }

    return await this.postsRepository.save({
      text,
      createdAt: new Date(),
      user,
      mentioned,
      hashtags,
    });
  }

  async findPostById(postId: number): Promise<Post> {
    return this.postsRepository.findOneOrFail(postId)
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find post with id '${postId}'`);
        }

        throw new Error(reason);
      });
  }
}
