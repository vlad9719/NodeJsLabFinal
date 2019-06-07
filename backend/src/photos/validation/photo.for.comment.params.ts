import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PhotoForCommentParams {

  @IsNotEmpty()
  @IsNumberString()
  commentId: number;

}
