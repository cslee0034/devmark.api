import { Injectable } from '@nestjs/common';
import { UpdateFeedDto } from './dto/update-feed.dto';
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

  findOne(id: number) {
    return `This action returns a #${id} feed`;
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
  }

  async remove(id: number) {
    const deleteFeed = await this.feedRepository.deleteFeed(id);
    return { status: 201, success: true };
  }
}
