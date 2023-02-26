import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ReqWithUserId } from 'src/common/decorators/req_user_id.decorator';
import { FeedEntity } from './entities/feed.entity';

@Controller('api/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create_feed(
    @ReqWithUserId() body,
  ): Promise<{ status: number; success: boolean }> {
    return this.feedService.create(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('')
  find_feed(@Query('id') id, @Query('search') search): Promise<FeedEntity[]> {
    const query = { id, search };
    return this.feedService.findPage(query);
  }

  @Delete(':id')
  remove_feed(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
