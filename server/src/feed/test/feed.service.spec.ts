import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FeedService } from '../feed.service';
import { FeedRepository } from '../repository/feed.repository';

const mockFeedRepository = () => ({
  createFeed: jest.fn(),
  pagenateFeed: jest.fn(),
  deleteFeed: jest.fn(),
});

interface ReqWithUserId {
  FeedName?: string;
  FeedContent?: string;
  img?: string;
  URL?: string;
  user_id?: string;
}

interface query {
  id: string;
  search: string;
}

interface body {
  id: string;
}

describe('FeedService', () => {
  let spyFeedService: FeedService;
  let spyFeedRepository: FeedRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedService,
        {
          provide: FeedRepository,
          useFactory: mockFeedRepository,
        },
      ],
    }).compile();

    spyFeedService = module.get<FeedService>(FeedService);
    spyFeedRepository = module.get<FeedRepository>(FeedRepository);
  });

  describe('createFeed', () => {
    const ReqWithUserId: ReqWithUserId = {
      FeedName: 'test_feed',
      FeedContent: 'test_content',
      img: '',
      URL: '',
      user_id: '1',
    };

    it('새 피드 생성', async () => {
      // Method Mocking
      (spyFeedRepository.createFeed as jest.Mock).mockReturnValue(null);

      // Excute
      const result = await spyFeedService.create(ReqWithUserId);

      // Expect
      expect(spyFeedRepository.createFeed).toBeCalled();
      expect(spyFeedRepository.createFeed).toBeCalledWith(ReqWithUserId);
      expect(result).toEqual({ status: 201, success: true });
    });

    it('새 피드 생성 실패', async () => {
      // Method Mocking
      (spyFeedRepository.createFeed as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      try {
        // Excute
        const result = await spyFeedService.create(ReqWithUserId);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('findPage', () => {
    const query: query = { id: '1', search: 'search' };
    it('피드 찾기 성공', async () => {
      // Method Mocking
      (spyFeedRepository.pagenateFeed as jest.Mock).mockReturnValue({
        Feed: 1,
      });

      // Excute
      const result = await spyFeedService.findPage(query);

      // Expect
      expect(spyFeedRepository.pagenateFeed).toBeCalled();
      expect(spyFeedRepository.pagenateFeed).toBeCalledWith(query);
      expect(result).toEqual({ Feed: 1 });
    });

    it('피드 찾기 실패', async () => {
      // Method Mocking
      (spyFeedRepository.pagenateFeed as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      try {
        // Excute
        const result = await spyFeedService.create(query);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('deleteFeed', () => {
    const body: body = { id: '1' };
    it('피드 삭제 성공', async () => {
      // Method Mocking
      (spyFeedRepository.deleteFeed as jest.Mock).mockReturnValue({
        Feed: 1,
      });

      // Excute
      const result = await spyFeedService.remove(+body.id);

      // Expect
      expect(spyFeedRepository.deleteFeed).toBeCalled();
      expect(spyFeedRepository.deleteFeed).toBeCalledWith(+body.id);
      expect(result).toEqual({ status: 201, success: true });
    });

    it('피드 삭제 실패', async () => {
      // Method Mocking
      (spyFeedRepository.deleteFeed as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      try {
        // Excute
        const result = await spyFeedService.create(+body.id);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
