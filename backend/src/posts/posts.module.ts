import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { HashtagsService } from '../hashtags/hashtags.service';
import { HashtagsModule } from '../hashtags/hashtags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule, HashtagsModule],
  controllers: [PostsController],
  providers: [PostsService, UsersService, HashtagsService],
})
export class PostsModule {}
