import { Injectable } from '@nestjs/common';
import { FeedRepository } from './repository/feed.repository';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}

  async create(body) {
    const createdFeed = await this.feedRepository.createFeed(body);
    return { status: 201, success: true };
  }

  async findPage(query) {
    const pagenatedFeeds = await this.feedRepository.pagenateFeed(query);
    return pagenatedFeeds;
  }

  async remove(id: number) {
    const deleteFeed = await this.feedRepository.deleteFeed(id);
    return { status: 201, success: true };
  }
}
