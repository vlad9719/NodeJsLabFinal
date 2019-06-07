import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';
import { UsersModule } from '../users/users.module';
import { Hashtag } from '../entities/hashtag.entity';
import { HashtagsService } from '../hashtags/hashtags.service';
import { HashtagsModule } from '../hashtags/hashtags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Hashtag]), UsersModule, HashtagsModule],
  controllers: [PostsController],
  providers: [PostsService, UsersService, HashtagsService],
})
export class PostsModule {}
