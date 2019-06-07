import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindCommentsByPostParams {
  @IsNotEmpty()
  @IsNumberString()
  postId: number;

}
