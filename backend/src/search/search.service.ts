import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Hashtag } from '../entities/hashtag.entity';
import * as _ from 'lodash';
import { User } from '../entities/user.entity';
import { Photo } from '../entities/photo.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Hashtag)
    private readonly hashtagsRepository: Repository<Hashtag>,
    @InjectRepository(Photo)
    private readonly photosRepository: Repository<Photo>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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
    const posts: Post[] = await this.postsRepository
      .createQueryBuilder('post')
      .select()
      .where(`MATCH (text) AGAINST ('${query}')`)
      .getMany();

    const joinedPosts: Post[] = [];
    for (let post of posts) {
      post = await this.postsRepository.findOne({
        where: {
          id: post.id,
        },
        relations: ['mentioned', 'user', 'hashtags'],
      });

      post.photo = await this.photosRepository.findOne({
        where: {
          post,
        },
      });

      post.comments = await this.commentsRepository.find({
        where: {
          post,
        },
        relations: ['user', 'mentioned'],
      });

      joinedPosts.push(post);
    }

    return joinedPosts;
  }

  async searchByCommentsText(query: string): Promise<Comment[]> {
    const comments: Comment [] = await this.commentsRepository
      .createQueryBuilder()
      .select()
      .where(`MATCH (text) AGAINST ('${query}')`)
      .getMany();

    const joinedComments: Comment[] = [];

    for (let comment of comments) {
      comment = await this.commentsRepository.findOne({
        where: {
          id: comment.id,
        },
        relations: ['mentioned', 'user'],
      });

      comment.photo = await this.photosRepository.findOne({
        where: {
          comment,
        },
      });

      joinedComments.push(comment);
    }

    return joinedComments;
  }

  async searchByHashtagsText(query: string): Promise<object> {
    const hashtags: Hashtag [] = await this.hashtagsRepository
      .createQueryBuilder()
      .select()
      .where(`MATCH (text) AGAINST ('${query}')`)
      .getMany();

    const postsWithHashtags: Post [] = [];
    const joinedPostsWithHashtags: Post[] = [];

    for (const hashtag of hashtags) {
      const postsWithHashtag: Post[] = await this.postsRepository.find({
        relations: ['hashtags'],
      })
        .then(posts => {
          return posts.filter(post => {
            return post.hashtags.some(postHashtag => _.isEqual(postHashtag, hashtag));
          });
        });

      for (let post of postsWithHashtag) {
        post = await this.postsRepository.findOne({
          where: {
            id: post.id,
          },
          relations: ['mentioned', 'user', 'comments', 'hashtags'],
        });

        const joinedComments: Comment[] = [];
        for (let comment of post.comments) {
          comment = await this.commentsRepository.findOne({
            where: {
              id: comment.id,
            },
            relations: ['mentioned', 'user'],
          });

          comment.photo = await this.photosRepository.findOne({
            where: {
              comment,
            },
          });

          joinedComments.push(comment);
          console.log(JSON.stringify(comment, null, 2));
        }

        post.comments = joinedComments;

        post.photo = await this.photosRepository.findOne({
          where: {
            post,
          },
        });

        joinedPostsWithHashtags.push(post);
      }

      return {
        hashtags,
        postsWithHashtags: joinedPostsWithHashtags,
      };
    }
  }
}
