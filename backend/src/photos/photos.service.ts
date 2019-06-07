import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from '../entities/photo.entity';
import { Repository } from 'typeorm';
import { PostsService } from '../posts/posts.service';
import { CommentsService } from '../comments/comments.service';

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
    const photo = await this.findPhotoByPostId(postId);

    if (photo) {
      throw new BadRequestException(`Post with id '${postId}' already has a photo`);
    }

    return await this.photoRepository.save({
      url,
      post,
    });
  }

  async addPhotoForComment(url: string, commentId: number): Promise<Photo> {
    const comment = await this.commentsService.findCommentById(commentId);

    const photo = await this.findPhotoByCommentId(commentId);

    if (photo) {
      throw new BadRequestException(`Comment with id '${commentId}' already has a photo`);
    }

    return await this.photoRepository.save({
      url,
      comment,
    });
  }

  async findPhotoByPostId(postId: number): Promise<Photo> {
    const post = await this.postsService.findPostById(postId);
    return await this.photoRepository.findOne({
      post,
    });
  }

  async findPhotoByCommentId(commentId: number): Promise<Photo> {
    const comment = await this.commentsService.findCommentById(commentId);
    return await this.photoRepository.findOne({
      comment,
    });
  }
}
