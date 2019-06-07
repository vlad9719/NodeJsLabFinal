import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DeleteFollowingParams {
  @IsNotEmpty()
  @IsNumberString()
  userId: number;

}
