import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetFeedForUserParams {

  @IsNotEmpty()
  @IsNumberString()
  userId: number;

}
