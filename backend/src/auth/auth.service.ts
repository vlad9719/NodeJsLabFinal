import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

export enum Provider {
  GOOGLE = 'google',
  TWITTER = 'twitter',
}

@Injectable()
export class AuthService {

  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService,
              ) {
  }

  async validateOAuthLogin(profile, provider: Provider): Promise<object> {
    try {

      let user: User = await this.usersService.findUserByThirdPartyId(profile.id, provider);

      if (!user) {
        user = await this.usersService.registerOAuthUser(profile, provider);
      }

      const payload = {
        id: user.id,
        thirdPartyId: profile.id,
        provider,
      };

      const jwt = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 3600 });

      return {
        accessToken: jwt,
        user,
      };
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  async signPayload(payload: any) {
    return sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '12h'});
  }

  async validateUser(payload: any): Promise<object> {
    return this.usersService.findByPayload(payload);
  }

  async getUserByJwt(jwt: string) {
    const payload: any = this.jwtService.decode(jwt);
    return await this.usersService.findUserById(payload.id);
  }

}
