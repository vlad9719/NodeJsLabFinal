import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PhotoForPostParams {
  @IsNumberString()
  @IsNotEmpty()
  postId: number;
}
