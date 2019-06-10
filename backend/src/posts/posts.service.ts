import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { HashtagsService } from '../hashtags/hashtags.service';
import { User } from '../entities/user.entity';
import { Comment } from '../entities/comment.entity';
import { Photo } from '../entities/photo.entity';
import nodemailer= require('nodemailer');

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Photo)
    private readonly photosRepository: Repository<Photo>,
    private readonly usersService: UsersService,
    private readonly hashtagService: HashtagsService,
  ) {
  }

  async addPost(userId: number, text: string, mentionedIds: number[], hashtagsStrings: string[] = []): Promise<Post> {

    const user: User = await this.usersService.findUserById(userId);

    let mentioned: User[] = [];
    if (mentionedIds) {
      for (const id of mentionedIds) {
        const mentionedUser = await this.usersService.findUserById(id);
        if (mentionedUser.email) {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GOOGLE_EMAIL,
              pass: process.env.GOOGLE_PASSWORD,
            },
          });

          const mailOptions = {
            from: 'twittar@email.com',
            to: mentionedUser.email,
            subject: 'You were just mentioned',
            html: `<p>You were mentioned by ${user.login} in post:</p><p>${text}</p>`
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              throw err;
            }
          });
        }
      }
      mentioned = await this.usersService.findUsersByIds(mentionedIds);
    }

    const hashtags = await this.hashtagService.createHashtagsArray(hashtagsStrings);

    return this.postsRepository.save({
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

  async findPostsByUserId(userId: number): Promise<Post[]> {
    const user: User = await this.usersService.findUserById(userId);

    const posts: Post[] = await this.postsRepository.find({
      where: {
        user,
      },
      relations: ['mentioned', 'hashtags', 'user'],
    });

    for (const post of posts) {
      post.comments = await this.commentsRepository.find({
        where: {
          post,
        },
        relations: ['user', 'mentioned'],
      });

      for (const comment of post.comments) {
        comment.photo = await this.photosRepository.findOne({
          comment,
        });
      }

      post.photo = await this.photosRepository.findOne({
        where: {
          post,
        },
      });
    }

    return posts;
  }

  async getUserFeed(userId: number): Promise<object> {
    const userPosts: Post[] = await this.findPostsByUserId(userId);

    const following: User[] = await this.usersService.getFollowingByUserId(userId);

    const followingPosts: Post[] = [];

    for (const followingUser of following) {
      const posts = await this.findPostsByUserId(followingUser.id);
      followingPosts.push(...posts);
    }

    const feedPosts = [...userPosts, ...followingPosts];
    feedPosts.sort((postA, postB) => {
      return postB.createdAt.valueOf() - postA.createdAt.valueOf();
    });

    return {
      feedPosts,
    };
  }
}
