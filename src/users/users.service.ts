import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { generate } from 'password-hash';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(userDto: CreateUserDto): Promise<User> {
    let user: User = await this.usersRepository.findOne({
      login: userDto.login,
    });

    if (user) {
      throw new BadRequestException('Login has already been taken');
    }

    user = await this.usersRepository.findOne({
      email: userDto.email,
    });

    if (user) {
      throw new BadRequestException('User with such email has already been registered');
    }

    return await this.usersRepository.save({
      login: userDto.login,
      email: userDto.email,
      password: generate(userDto.password, {
        algorithm: 'sha256',
      }),
    });
  }

  async findUserByThirdPartyId(thirdPartyId: string, thirdPartyProvider: string): Promise<User> {
    return this.usersRepository.findOne({
      thirdPartyId,
      thirdPartyProvider,
    });
  }

  async registerOAuthUser(profile, thirdPartyProvider: string): Promise<User> {
    return this.usersRepository.save({
      thirdPartyId: profile.id,
      thirdPartyProvider,
      login: profile.displayName,
    });
  }

  async findUserByLogin(login: string): Promise<User> {
    return this.usersRepository.findOne({
      login,
    });
  }

  async findByPayload(payload: any) {
    const { login } = payload;

    return await this.usersRepository.findOne({
      login,
    });
  }
}
