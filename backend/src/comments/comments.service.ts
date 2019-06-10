import { BadRequestException, Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Photo } from '../entities/photo.entity';
import nodemailer= require('nodemailer');

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async addComment(userId: number, postId: number, text: string, mentionedIds: number[]): Promise<Comment> {

    const user: User = await this.usersService.findUserById(userId);

    const post: Post = await this.postsService.findPostById(postId);

    let mentioned: User[] = [];
    if (mentionedIds) {
      mentioned = await this.usersService.findUsersByIds(mentionedIds);

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
            html: `<p>You were mentioned by ${user.login} in comment:</p><p>${text}</p>`
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              throw err;
            }
          });
        }
      }
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

  async findCommentsByPostId(postId: number): Promise<Comment[]> {
    const post = await this.postsService.findPostById(postId);

    const comments: Comment[] = await this.commentsRepository.find({
      where: {
        post,
      },
      relations: ['user', 'mentioned'],
    });

    for (const comment of comments) {
      comment.photo = await this.photoRepository.findOne({
        comment,
      });
    }

    return comments;
  }
}
