import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsArray()
  mentionedIds: number[];
}
