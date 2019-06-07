import { IsNotEmpty } from 'class-validator';

export class PhotosDto {
  @IsNotEmpty({
    message: 'Please provide a file',
  })
  file: any;
}
