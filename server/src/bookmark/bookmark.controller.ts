import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { BookmarkEntity } from './entities/bookmark.entity';

@Controller('api/bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create(
    @Body() body: CreateBookmarkDto,
  ): Promise<{ status: number; success: boolean }> {
    return this.bookmarkService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll(@Query('boxId') boxId: string): Promise<BookmarkEntity[]> {
    return this.bookmarkService.findAll(+boxId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  update(@Body() body: UpdateBookmarkDto) {
    return this.bookmarkService.update(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  remove(@Body() body): Promise<{ status: number; success: boolean }> {
    return this.bookmarkService.remove(body.id);
  }
}
