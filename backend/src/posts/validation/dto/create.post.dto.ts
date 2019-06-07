import { IsArray, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  text: string;

  @IsArray()
  mentionedIds: number[];

  @IsArray()
  hashtags: string[];
}
