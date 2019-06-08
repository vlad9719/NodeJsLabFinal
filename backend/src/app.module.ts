import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthcheckController } from './healthcheck/healthcheck.controller';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PhotosModule } from './photos/photos.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { CommentsModule } from './comments/comments.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, AuthModule, PostsModule, PhotosModule, HashtagsModule, CommentsModule, SearchModule],
  controllers: [AppController, HealthcheckController, AuthController, UsersController],
  providers: [AppService, AuthService, UsersService],
})
export class AppModule {}
