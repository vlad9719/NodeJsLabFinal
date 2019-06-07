import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Hashtag } from '../entities/hashtag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HashtagsService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagsRepository: Repository<Hashtag>,
  ) {}

  async findOrCreateHashtag(text: string): Promise<Hashtag> {
    const hashtag = await this.hashtagsRepository.findOne({
      text,
    });

    return hashtag ? hashtag : await this.hashtagsRepository.save({
      text,
    });
  }
}
