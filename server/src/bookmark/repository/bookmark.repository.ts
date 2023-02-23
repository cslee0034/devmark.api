import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from '../dto/create-bookmark.dto';
import { BookmarkEntity } from '../entities/bookmark.entity';

@Injectable()
export class BookmarkRepository {
  constructor(
    @InjectRepository(BookmarkEntity)
    private readonly bookmarkRepository: Repository<BookmarkEntity>,
  ) {}

  async createBookmark(body: CreateBookmarkDto) {
    try {
      const bookmark = {
        ...body,
        box: { id: Number(body.boxId) },
        // bookmark property 뿐 아니라 box property로 포함한다.
      };
      const result = await this.bookmarkRepository.save(bookmark);
    } catch (error) {
      throw new InternalServerErrorException('error while saving bookmark');
      // 내부 서버 에러 500
    }
  }
}
