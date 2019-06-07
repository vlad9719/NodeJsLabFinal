import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { PostsService } from '../posts/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '../entities/photo.entity';
import { PostsModule } from '../posts/posts.module';
import { UsersService } from '../users/users.service';
import { HashtagsService } from '../hashtags/hashtags.service';
import { HashtagsModule } from '../hashtags/hashtags.module';
import { CommentsModule } from '../comments/comments.module';
import { CommentsService } from '../comments/comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), PostsModule, HashtagsModule, CommentsModule],
  controllers: [PhotosController],
  providers: [PhotosService, PostsService, UsersService, HashtagsService, CommentsService],
})
export class PhotosModule {}
