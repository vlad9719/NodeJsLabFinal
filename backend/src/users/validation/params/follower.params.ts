import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FollowerParams {
  @IsNotEmpty()
  @IsNumberString()
  followerId: number;

  @IsNotEmpty()
  @IsNumberString()
  followingId: number;

}
