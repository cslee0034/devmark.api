import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ReqWithUserId } from 'src/common/decorators/req_user_id.decorator';
import { FeedEntity } from './entities/feed.entity';
import { CreateFeedDto } from './dto/create-feed.dto';
import { DeleteFeedDto } from './dto/delete-feed.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('api/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create_feed(
    @ReqWithUserId() body: CreateFeedDto,
  ): Promise<{ status: number; success: boolean }> {
    return this.feedService.create(body);
  }

  @Get('')
  find_feed(
    @Query('id', ParseIntPipe) id: number,
    @Query('search') search: string,
  ): Promise<FeedEntity[]> {
    const query = { id, search };
    return this.feedService.findPage(query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  remove_feed(
    @CurrentUser() user: UserEntity,
    @ReqWithUserId() body: DeleteFeedDto,
  ): Promise<{ status: number; success: boolean }> {
    return this.feedService.remove(user, +body.id);
  }
}
