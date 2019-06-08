import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './validation/dto/create.user.dto';
import { generate } from 'password-hash';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import * as _ from 'lodash';
import { cloneDeep } from '@babel/types';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
  }

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

  async addFollower(followerId: number, followingId: number): Promise<object> {
    const follower = await this.usersRepository.findOneOrFail({
      where: {
        id: followerId,
      },
      relations: ['following'],
    })
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find user with id '${followerId}'`);
        }

        throw new Error(reason);
      });

    const following = await this.usersRepository.findOneOrFail({
      where: {
        id: followingId,
      },
      relations: ['followers'],
    })
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find user with id '${followingId}'`);
        }

        throw new Error(reason);
      });

    follower.following.push(following);
    following.followers.push(follower);
    await this.usersRepository.save(following);
    await this.usersRepository.save(follower);

    return {
      message: 'Subscription confirmed',
      follower: await this.usersRepository.findOne(followerId),
      following: await this.usersRepository.findOne(followingId),
    };
  }

  async removeFollower(followerId: number, followingId: number) {
    const follower: User = await this.usersRepository.findOneOrFail({
      where: {
        id: followerId,
      },
      relations: ['following'],
    })
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find user with id '${followerId}'`);
        }

        throw new Error(reason);
      });

    let following: User = follower.following.find(user => {
      return user.id === +followingId;
    });

    if (!following) {
      throw new BadRequestException(`User with id '${followerId}' does not follow user with id '${followingId}'`);
    }

    following = await this.usersRepository.findOneOrFail({
      where: {
        id: followingId,
      },
      relations: ['followers'],
    })
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find user with id '${followingId}'`);
        }

        throw new Error(reason);
      });

    follower.following = follower.following.filter(user => {
      return user.id !== +followingId;
    });
    following.followers = following.followers.filter(user => {
      return user.id !== +followerId;
    });
    await this.usersRepository.save(following);
    await this.usersRepository.save(follower);

    return {
      message: 'Unsubscription confirmed',
      follower: await this.usersRepository.findOne(followerId),
      following: await this.usersRepository.findOne(followingId),
    };
  }

  async getFollowersByUserId(userId: number): Promise<User []> {
    return this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['followers'],
    })
      .then(user => {
        if (!user) {
          throw new BadRequestException(`Could not find user with id '${userId}'`);
        }
        return user.followers;
      });
  }

  async getFollowingByUserId(userId: number): Promise<User []> {
    return this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['following'],
    })
      .then(user => {
        if (!user) {
          throw new BadRequestException(`Could not find user with id '${userId}'`);
        }
        return user.following;
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
    return this.usersRepository.findOneOrFail({
      login,
    })
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find user with login '${login}'`);
        }

        throw new Error(reason);
      });
  }

  async findUserById(id: number): Promise<User> {
    return await this.usersRepository.findOneOrFail(id)
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find user with id '${id}'`);
        }

        throw new Error(reason);
      });
  }

  async findUsersByIds(ids: number[]): Promise<User[]> {
    return await this.usersRepository.findByIds(ids)
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find users with ids '${ids}'`);
        }

        throw new Error(reason);
      });
  }

  async findByPayload(payload: any) {
    const { login } = payload;

    return await this.usersRepository.findOneOrFail({
      login,
    })
      .catch(reason => {
        if (reason instanceof EntityNotFoundError) {
          throw new BadRequestException(`Could not find user with login '${login}'`);
        }

        throw new Error(reason);
      });
  }
}
