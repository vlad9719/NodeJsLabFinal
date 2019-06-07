import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PhotosParams {
  @IsNumberString()
  @IsNotEmpty()
  postId: number;
}
