import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetFollowersParams {
  @IsNotEmpty()
  @IsNumberString()
  userId: number;
}
