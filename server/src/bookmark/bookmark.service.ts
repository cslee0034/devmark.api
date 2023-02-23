import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { BookmarkRepository } from './repository/bookmark.repository';

@Injectable()
export class BookmarkService {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async createBookmark(body: CreateBookmarkDto) {
    const newBookmark = await this.bookmarkRepository.createBookmark(body);
    return { status: 201, success: true };
  }

  async findAll(boxId: number) {
    const bookmarks = await this.bookmarkRepository.findAllBookmarkById(boxId);
    return bookmarks;
  }

  async update(body: UpdateBookmarkDto) {
    const bookmarks = await this.bookmarkRepository.updateBookmark(body);
    return { status: 201, success: true };
  }

  remove(id: number) {
    return `This action removes a #${id} bookmark`;
  }
}
