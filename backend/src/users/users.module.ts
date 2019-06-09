import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secretOrPrivateKey: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: 3600,
    },
  })],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
