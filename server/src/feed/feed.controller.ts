import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ReqWithUserId } from 'src/common/decorators/req_user_id.decorator';

@Controller('api/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create_feed(@ReqWithUserId() body) {
    return this.feedService.create(body);
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
