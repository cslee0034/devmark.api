import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ReqWithUserId } from 'src/common/decorators/req_user_id.decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { BookmarkEntity } from './entities/bookmark.entity';

@Controller('api/bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  createBookmark(
    @Body() body: CreateBookmarkDto,
  ): Promise<{ status: number; success: boolean }> {
    return this.bookmarkService.createBookmark(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('')
  findAll(@Query('boxId') boxId: string): Promise<BookmarkEntity[]> {
    return this.bookmarkService.findAll(+boxId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bookmarkService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.update(+id, updateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(+id);
  }
}
