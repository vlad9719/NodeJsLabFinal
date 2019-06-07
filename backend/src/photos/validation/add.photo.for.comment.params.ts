import { IsNotEmpty, IsNumberString } from 'class-validator';

export class AddPhotoForCommentParams {

  @IsNotEmpty()
  @IsNumberString()
  commentId: number;

}
