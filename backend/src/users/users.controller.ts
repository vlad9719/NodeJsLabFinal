import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './validation/dto/create.user.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { FollowerParams } from './validation/params/follower.params';
import { GetFollowersParams } from './validation/params/get.followers.params';
import { GetFollowingParams } from './validation/params/get.following.params';

@Controller('/api/users')
export class UsersController {

  constructor(private readonly usersService: UsersService,
              private readonly authService: AuthService,
  ) {

  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.register(createUserDto);
    const payload = {
      id: user.id,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('/follower/:followerId/:followingId')
  async addFollower(@Param() params: FollowerParams) {
    return await this.usersService.addFollower(params.followerId, params.followingId);
  }

  @Get('/followers/:userId')
  async getFollowersByUserId(@Param() params: GetFollowersParams) {
    return await this.usersService.getFollowersByUserId(params.userId)
      .then(followers => {
        return {
          followers,
          count: followers.length,
        };
      });
  }

  @Get('/following/:userId')
  async getFollowingByUserId(@Param() params: GetFollowingParams) {
    return await this.usersService.getFollowingByUserId(params.userId)
      .then(following => {
        return {
          following,
          count: following.length,
        };
      });
  }

  @Delete('/following/:followerId/:followingId')
  async removeFollowingByUserId(@Param() params: FollowerParams) {
    return await this.usersService.removeFollower(params.followerId, params.followingId);
  }
}
