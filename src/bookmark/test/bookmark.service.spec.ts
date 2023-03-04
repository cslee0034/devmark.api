import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from '../bookmark.service';
import { BookmarkRepository } from '../repository/bookmark.repository';
import { CreateBookmarkDto } from '../dto/create-bookmark.dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { BoxRepository } from 'src/box/repository/box.repository';
import { UpdateBookmarkDto } from '../dto/update-bookmark.dto';

const mockBoxRepository = () => ({
  findAllBoxByUserId: jest.fn(() => [{ id: 1, boxName: 'test' }]),
});

const mockBookmarkRepository = () => ({
  createBookmark: jest.fn((body) => {
    if (body.bookmarkName && body.URL && body.boxId) {
      return { bookmark: 1 };
    } else {
      throw new InternalServerErrorException();
    }
  }),

  findAllBookmarkById: jest.fn((boxId) => {
    if (boxId === 1) {
      return { bookmark: 1 };
    }
    return NotFoundException;
  }),

  updateBookmark: jest.fn((body) => {
    if (body.bookmarkName && body.URL && body.boxId && body.bookmarkId) {
      return { status: 200, success: true };
    } else {
      return { status: 422, success: false };
    }
  }),

  deleteBookmark: jest.fn((id) => {
    if (id) {
      return { status: 200, success: true };
    } else {
      return { status: 422, success: false };
    }
  }),
});

describe('BookmarkService', () => {
  let spyBookmarkService: BookmarkService;
  let spyBookmarkRepository: BookmarkRepository;
  let spyBoxRepository: BoxRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarkService,
        {
          provide: BookmarkRepository,
          useFactory: mockBookmarkRepository,
        },
        {
          provide: BoxRepository,
          useFactory: mockBoxRepository,
        },
      ],
    }).compile();

    spyBookmarkService = module.get<BookmarkService>(BookmarkService);
    spyBookmarkRepository = module.get<BookmarkRepository>(BookmarkRepository);
    spyBoxRepository = module.get<BoxRepository>(BoxRepository);
  });

  describe('create_bookmark', () => {
    const user = new UserEntity();
    const body: CreateBookmarkDto = {
      bookmarkName: 'test_bookmarkName',
      URL: 'test_url',
      boxId: '1',
    };

    it('새 북마크 생성', async () => {
      const result = await spyBookmarkService.create(user, body);

      expect(spyBookmarkRepository.createBookmark).toBeCalled();
      expect(spyBookmarkRepository.createBookmark).toBeCalledWith({
        bookmarkName: body.bookmarkName,
        URL: body.URL,
        boxId: body.boxId,
      });
      expect(result).toEqual({ status: 201, success: true });
    });

    it('새 북마크 생성 실패', async () => {
      body.bookmarkName = null;
      try {
        const result = await spyBookmarkService.create(user, body);
      } catch (error) {
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('findAll_bookmark', () => {
    const user = new UserEntity();
    const boxId = 1;

    it('북마크 찾기 성공', async () => {
      const result = await spyBookmarkService.findAll(user, boxId);

      expect(spyBoxRepository.findAllBoxByUserId).toBeCalled();
      expect(spyBookmarkRepository.findAllBookmarkById).toBeCalled();
      expect(spyBookmarkRepository.findAllBookmarkById).toBeCalledWith(boxId);
      expect(result).toEqual({ bookmark: 1 });
    });

    it('북마크 찾기 실패', async () => {
      const user_id = 2;
      try {
        const result = await spyBookmarkService.findAll(user, boxId);
      } catch (error) {
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update_bookmark', () => {
    const user = new UserEntity();
    const body: UpdateBookmarkDto = {
      bookmarkName: 'test_bookmarkname',
      URL: 'test_url',
      boxId: '1',
      bookmarkId: 1,
    };

    it('북마크 업데이트 성공', async () => {
      const result = await spyBookmarkService.update(user, body);

      expect(spyBookmarkRepository.updateBookmark).toBeCalledWith(body);
      expect(result).toEqual({ status: 200, success: true });
    });

    it('북마크 업데이트 실패', async () => {
      body.bookmarkName = null;
      try {
        const result = await spyBookmarkService.update(user, body);
      } catch (error) {
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf({ status: 422, success: false });
      }
    });
  });

  describe('delete_bookmark', () => {
    const user = new UserEntity();
    const body = { id: 1, boxId: 1 };

    it('북마크 삭제 성공', async () => {
      const result = await spyBookmarkService.remove(user, body);

      expect(spyBookmarkRepository.deleteBookmark).toBeCalledWith(body.id);
      expect(result).toEqual({ status: 200, success: true });
    });

    it('북마크 삭제 실패', async () => {
      body.id = null;
      try {
        const result = await spyBookmarkService.remove(user, body);
      } catch (error) {
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf({ status: 422, success: false });
      }
    });
  });
});
