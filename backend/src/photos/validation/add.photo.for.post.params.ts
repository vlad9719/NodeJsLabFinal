import { IsNotEmpty, IsNumberString } from 'class-validator';

export class AddPhotoForPostParams {
  @IsNumberString()
  @IsNotEmpty()
  postId: number;
}
