import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateCommentParams {
  @IsNumberString()
  @IsNotEmpty()
  userId: number;

  @IsNumberString()
  @IsNotEmpty()
  postId: number;
}
