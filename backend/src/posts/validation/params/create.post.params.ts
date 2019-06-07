import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreatePostParams {
  @IsNumberString()
  @IsNotEmpty()
  userId: number;
}
