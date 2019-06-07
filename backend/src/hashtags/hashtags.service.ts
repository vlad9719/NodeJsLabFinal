import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Hashtag } from '../entities/hashtag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import has = Reflect.has;

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

  async findHashtag(text: string): Promise<Hashtag> {
    return await this.hashtagsRepository.findOne({
      text,
    });
  }

  async saveHashtag(text: string): Promise<Hashtag> {
    return await this.hashtagsRepository.save({
      text,
    });
  }

  async createHashtagsArray(hashtagStrings: string[]): Promise<Hashtag[]> {
    const hashtags: Hashtag[] = [];

    for (const hashtagString of hashtagStrings) {
      let hashtag = await this.findHashtag(hashtagString);

      if (!hashtag) {
        hashtag = await this.saveHashtag(hashtagString);
      }

      hashtags.push(hashtag);
    }

    return hashtags;
  }
}
