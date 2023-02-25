import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FeedService } from '../feed.service';
import { FeedRepository } from '../repository/feed.repository';

const mockFeedRepository = () => ({
  createFeed: jest.fn(),
});

interface ReqWithUserId {
  FeedName?: string;
  FeedContent?: string;
  img?: string;
  URL?: string;
  user_id?: string;
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
});
