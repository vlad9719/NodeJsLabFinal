import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsArray()
  mentionedIds: number[];

  @IsOptional()
  @IsArray()
  hashtags: string[];
}
