import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { PostsModule } from '../posts/posts.module';
import { PostsService } from '../posts/posts.service';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { HashtagsService } from '../hashtags/hashtags.service';
import { Photo } from '../entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Photo]), UsersModule, PostsModule, HashtagsModule],
  providers: [CommentsService, UsersService, PostsService, HashtagsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
