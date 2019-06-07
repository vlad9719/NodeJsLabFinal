import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetFollowingParams {
  @IsNotEmpty()
  @IsNumberString()
  userId: number;

}
