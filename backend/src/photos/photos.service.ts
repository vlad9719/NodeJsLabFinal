import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from '../entities/photo.entity';
import { Repository } from 'typeorm';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class PhotosService {

  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly postsService: PostsService,
  ) {}

  async addPhotoForPost(url: string, postId: number): Promise<Photo> {
    const post = await this.postsService.findPostByid(postId);
    return await this.photoRepository.save({
      url,
      post,
    });
  }
}
