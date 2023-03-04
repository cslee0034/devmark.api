import { Injectable } from '@nestjs/common';
import { BoxRepository } from 'src/box/repository/box.repository';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { BookmarkRepository } from './repository/bookmark.repository';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly boxRepository: BoxRepository,
  ) {}

  async create(user: UserEntity, body: CreateBookmarkDto) {
    // user가 가지고 있는 box 가져오기
    const boxs = await this.boxRepository.findAllBoxByUserId(user.id);
    // box의 id 추출.
    const boxIds = boxs.map((box) => box.id);
    // body에 있는 boxId가 user가 가지고 있는 box들에 없다면 그대로 끝낸다.
    if (!boxIds.includes(+body.boxId)) {
      return;
    }
    // creteBookmark
    const createdBookmark = await this.bookmarkRepository.createBookmark(body);
    return { status: 201, success: true };
  }

  async findAll(user: UserEntity, boxId: number) {
    // user가 가지고 있는 box 가져오기
    const boxs = await this.boxRepository.findAllBoxByUserId(user.id);
    // box의 id 추출.
    const boxIds = boxs.map((box) => box.id);
    // 쿼리에 있는 boxId가 user가 가지고 있는 box들에 없다면 그대로 끝낸다.
    if (!boxIds.includes(+boxId)) {
      return;
    }
    // find bookmark
    const readBookmarks = await this.bookmarkRepository.findAllBookmarkById(
      boxId,
    );
    return readBookmarks;
  }

  async update(user: UserEntity, body: UpdateBookmarkDto) {
    // user가 가지고 있는 box 가져오기
    const boxs = await this.boxRepository.findAllBoxByUserId(user.id);
    // box의 id 추출.
    const boxIds = boxs.map((box) => box.id);
    // body에 있는 boxId가 user가 가지고 있는 box들에 없다면 그대로 끝낸다.
    if (!boxIds.includes(+body.boxId)) {
      return;
    }
    const updatedBookmark = await this.bookmarkRepository.updateBookmark(body);
    return { status: 200, success: true };
  }

  async remove(user: UserEntity, body: any) {
    // user가 가지고 있는 box 가져오기
    const boxs = await this.boxRepository.findAllBoxByUserId(user.id);
    // box의 id 추출.
    const boxIds = boxs.map((box) => box.id);
    // body에 있는 boxId가 user가 가지고 있는 box들에 없다면 그대로 끝낸다.
    if (!boxIds.includes(+body.boxId)) {
      return;
    }
    const deletedBookmark = await this.bookmarkRepository.deleteBookmark(
      body.id,
    );
    return { status: 200, success: true };
  }
}
