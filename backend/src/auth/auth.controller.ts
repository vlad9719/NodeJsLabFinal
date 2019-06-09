import { Controller, Get, UseGuards, Res, Req, UnauthorizedException, Post, Body, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizeUserDto } from '../users/validation/dto/authorize.user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

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
    const jwt: string = req.user.accessToken;
    const user: object = req.user.user;
    if (user) {
      res.redirect('http://localhost:3000/authorized-with-google/' + jwt);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post('/login')
  async login(@Body() authorizeUserDto: AuthorizeUserDto) {
    const user = await this.usersService.findUserByLogin(authorizeUserDto.login);
    const payload = {
      id: user.id,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('/me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() request: Request) {
    const authHeader = request.headers.authorization;
    const jwt = authHeader.slice(7);
    return await this.authService.getUserByJwt(jwt);
  }

}
