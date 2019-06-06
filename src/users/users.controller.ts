import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('/api/users')
export class UsersController {

  constructor(private readonly usersService: UsersService,
              private readonly authService: AuthService,
  ) {

  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.register(createUserDto);
    const payload = {
      id: user.id,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
