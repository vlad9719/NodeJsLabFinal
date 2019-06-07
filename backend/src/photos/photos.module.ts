import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { PostsService } from '../posts/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Photo } from '../entities/photo.entity';
import { PostsModule } from '../posts/posts.module';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { HashtagsService } from '../hashtags/hashtags.service';
import { Hashtag } from '../entities/hashtag.entity';
import { HashtagsModule } from '../hashtags/hashtags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Post]), PostsModule, HashtagsModule],
  controllers: [PhotosController],
  providers: [PhotosService, PostsService, UsersService, HashtagsService],
})
export class PhotosModule {}
