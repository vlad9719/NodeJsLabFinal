import { IsNotEmpty } from 'class-validator';

export class AuthorizeUserDto {

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
