import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { BookmarkEntity } from './entities/bookmark.entity';

@Controller('api/bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create_bookmark(
    @CurrentUser() user: UserEntity,
    @Body() body: CreateBookmarkDto,
  ): Promise<{ status: number; success: boolean }> {
    return this.bookmarkService.create(user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll_bookmark(
    @CurrentUser() user: UserEntity,
    @Query('boxId', ParseIntPipe) boxId: number,
  ): Promise<BookmarkEntity[]> {
    return this.bookmarkService.findAll(user, boxId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  update_bookmark(
    @CurrentUser() user: UserEntity,
    @Body() body: UpdateBookmarkDto,
  ): Promise<{ status: number; success: boolean }> {
    return this.bookmarkService.update(user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  remove_bookmark(
    @CurrentUser() user: UserEntity,
    @Body() body,
  ): Promise<{ status: number; success: boolean }> {
    return this.bookmarkService.remove(user, body);
  }
}
