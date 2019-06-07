import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetPostsByUserParams {
  @IsNotEmpty()
  @IsNumberString()
  userId: number;

}
