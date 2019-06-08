import { IsNotEmpty } from 'class-validator';

export class QueryParams {

  @IsNotEmpty()
  query: string;

}
