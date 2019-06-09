import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { HashtagsService } from '../hashtags/hashtags.service';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { CommentsModule } from '../comments/comments.module';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../entities/comment.entity';
import { Photo } from '../entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Photo]), UsersModule, HashtagsModule],
  controllers: [PostsController],
  providers: [PostsService, UsersService, HashtagsService],
})
export class PostsModule {}
