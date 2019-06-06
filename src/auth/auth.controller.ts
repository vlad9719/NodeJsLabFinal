import { Controller, Get, UseGuards, Res, Req, UnauthorizedException, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizeUserDto } from '../users/dto/authorize.user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('api/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.jwt;
    const user: object = req.user;
    if (user) {
      res.json({
        accessToken: jwt,
        ...user,
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post('/login')
  async login(@Body() authorizeUserDto: AuthorizeUserDto) {
    const user = await this.usersService.findUserByLogin(authorizeUserDto.login);
    const payload = {
      login: user.login,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

}
