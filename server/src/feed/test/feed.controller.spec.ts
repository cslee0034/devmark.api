import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from '../feed.controller';
import { FeedService } from '../feed.service';

const mockFeedService = () => ({
  create: jest.fn((ReqWithUserId) => {
    if (ReqWithUserId) {
      return { status: 201, success: true };
    } else {
      throw new InternalServerErrorException();
    }
  }),
});

interface ReqWithUserId {
  FeedName?: string;
  FeedContent?: string;
  img?: string;
  URL?: string;
  user_id?: string;
}

describe('FeedController', () => {
  let controller: FeedController;
  let spyFeedService: FeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [{ provide: FeedService, useFactory: mockFeedService }],
    }).compile();

    controller = module.get<FeedController>(FeedController);
    spyFeedService = module.get<FeedService>(FeedService);
  });

  describe('create_feed', () => {
    it('피드 컨트롤러 통과', async () => {
      // Method Mocking
      const ReqWithUserId: ReqWithUserId = {
        FeedName: 'test_feed',
        FeedContent: 'test_content',
        img: '',
        URL: '',
        user_id: '1',
      };

      // Excute
      const response = await controller.create_feed(ReqWithUserId);

      // Expect
      expect(spyFeedService.create).toBeCalled();
      expect(spyFeedService.create).toBeCalledWith(ReqWithUserId);
      expect(response).toEqual({ status: 201, success: true });
    });

    it('피드 컨트롤러 통과 실패', async () => {
      const ReqWithUserId: ReqWithUserId = null;
      try {
        // Excute
        const response = await controller.create_feed(ReqWithUserId);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
