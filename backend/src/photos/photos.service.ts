import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from '../entities/photo.entity';
import { Repository } from 'typeorm';
import { PostsService } from '../posts/posts.service';
import { CommentsService } from '../comments/comments.service';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

@Injectable()
export class PhotosService {

  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  async addPhotoForPost(url: string, postId: number): Promise<Photo> {
    const post = await this.postsService.findPostById(postId);

    return await this.photoRepository.save({
      url,
      post,
    });
  }

  async addPhotoForComment(url: string, commentId: number): Promise<Photo> {
    const comment = await this.commentsService.findCommentById(commentId);


    return await this.photoRepository.save({
      url,
      comment,
    });
  }

  async findPhotoByPostId(postId: number): Promise<Photo> {
    const post = await this.postsService.findPostById(postId);
    return await this.photoRepository.findOneOrFail({
      post,
    })
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find photo for post with id '${postId}'`);
        }

        throw new Error(reason);
      });
  }

  async findPhotoByCommentId(commentId: number): Promise<Photo> {
    const comment = await this.commentsService.findCommentById(commentId);
    return await this.photoRepository.findOneOrFail({
      comment,
    })
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find photo for comment with id '${commentId}'`);
        }

        throw new Error(reason);
      });
  }
}
