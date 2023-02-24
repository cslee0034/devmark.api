import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';

@Controller('api/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post('')
  create_feed(@Body() createFeedDto: CreateFeedDto) {
    return this.feedService.create(createFeedDto);
  }

  @Get('')
  find_feed() {
    return this.feedService.findAll();
  }

  @Delete(':id')
  remove_feed(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
