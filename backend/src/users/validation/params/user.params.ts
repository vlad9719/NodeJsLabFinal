import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UserParams {
  @IsNotEmpty()
  @IsNumberString()
  userId: number;
}
