import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Hashtag } from '../entities/hashtag.entity';
import * as _ from 'lodash';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Hashtag)
    private readonly hashtagsRepository: Repository<Hashtag>,
  ) {
  }

  async search(query: string): Promise<object> {
    const searchResultsByPosts = await this.searchByPostsText(query);
    const searchResultsByComments = await this.searchByCommentsText(query);
    const searchResultsByHashtags = await this.searchByHashtagsText(query);

    return {
      searchResultsByPosts,
      searchResultsByComments,
      searchResultsByHashtags,
    };
  }

  async searchByPostsText(query: string): Promise<Post[]> {
    const posts: Post [] = await this.postsRepository
      .createQueryBuilder()
      .select()
      .where(`MATCH (text) AGAINST ('${query}')`)
      .getMany();

    return posts;
  }

  async searchByCommentsText(query: string): Promise<Comment[]> {
    const comments: Comment [] = await this.commentsRepository
      .createQueryBuilder()
      .select()
      .where(`MATCH (text) AGAINST ('${query}')`)
      .getMany();

    return comments;
  }

  async searchByHashtagsText(query: string): Promise<object> {
    const hashtags: Hashtag [] = await this.hashtagsRepository
      .createQueryBuilder()
      .select()
      .where(`MATCH (text) AGAINST ('${query}')`)
      .getMany();

    const postsWithHashtags: Post [] = [];

    for (const hashtag of hashtags) {
      const postsWithHashtag: Post[] = await this.postsRepository.find({
        relations: ['hashtags'],
      })
        .then(posts => {
          return posts.filter(post => {
            return post.hashtags.some(postHashtag => _.isEqual(postHashtag, hashtag));
          });
        });

      postsWithHashtags.push(...postsWithHashtag);
    }

    return {
      hashtags,
      postsWithHashtags,
    };
  }
}
