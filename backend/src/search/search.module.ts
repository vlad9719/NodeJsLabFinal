import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';
import { Hashtag } from '../entities/hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, Hashtag])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
