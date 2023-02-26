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
  findPage: jest.fn((query) => {
    if (query.id) {
      return { Feed: 1 };
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

interface query {
  id: string;
  search: string;
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

  describe('find_feed', () => {
    it('피드 찾기 컨트롤러 통과', async () => {
      const query: query = { id: '1', search: 'search' };

      // Excute
      const response = await controller.find_feed(query.id, query.search);

      // Expect
      expect(spyFeedService.findPage).toBeCalled();
      expect(spyFeedService.findPage).toBeCalledWith(query);
      expect(response).toEqual({ Feed: 1 });
    });

    it('피드 컨트롤러 통과 실패', async () => {
      const query: query = { id: null, search: 'search' };
      try {
        // Excute
        const response = await controller.find_feed(query.id, query.search);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
