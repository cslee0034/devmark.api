import { Test, TestingModule } from '@nestjs/testing';
import { BoxController } from '../box.controller';
import { BoxService } from '../box.service';
import { CreateBoxDto } from '../dto/create-box.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

const mockBoxService = () => ({
  create: jest.fn((createUserDto) => {
    if (createUserDto.boxName && createUserDto.img && createUserDto.user_id) {
      return { status: 201, success: true };
    } else {
      return { status: 422, success: false };
    }
  }),
});

const MockJwtAuthGuard = (param) => {
  if (param === 'kakao' || param === 'github') {
    return {
      req: {
        user: {
          access_token: 'token',
          email: 'test_email',
        },
      },
    };
  }
  return { email: 'test_email', id: 'test_id' };
};

describe('UserController', () => {
  let controller: BoxController;
  let spyBoxService: BoxService;
  let spyJwtAuthGuard: JwtAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Nest.js에서 제공하는 테스트 모듈을 만든다.
      controllers: [BoxController],
      providers: [
        // mocking function을 제공한다.
        { provide: BoxService, useFactory: mockBoxService },
        // privide = 프로바이더가 사용할 이름.
        // useFactory = 프로바이더가 동작할 방식을 결정한다 (동적 프로바이더 제공).
        // UserService의 함수는 팩토리 함수에서 반환된 값(함수)으로 제공된다.
        { provide: JwtAuthGuard, useFactory: MockJwtAuthGuard },
      ],
    }).compile();
    // 테스트 모듈에 등록된 provider와 기타 module의 인스턴스를 생성해서 종속성 해결.

    controller = module.get<BoxController>(BoxController);
    // UserController의 인스턴스를 가져온다. (get()은 TestingModule의 메서드)
    spyBoxService = module.get<BoxService>(BoxService);
    // UserService의 인스턴스를 가져온다.
    spyJwtAuthGuard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });

  describe('UploadBox', () => {
    it('박스 생성', async () => {
      const createBoxDto: CreateBoxDto = {
        boxName: 'test_boxname',
        img: 'test_img',
        user_id: 1,
      };
      const response = await controller.UplaodBox(createBoxDto);

      expect(spyBoxService.create).toBeCalled();
      expect(spyBoxService.create).toHaveBeenCalledWith(createBoxDto);
      expect(response).toEqual({ status: 201, success: true });
    });

    it('박스 생성 실패', async () => {
      const createBoxDto: any = {};
      const response = await controller.UplaodBox(createBoxDto);

      expect(spyBoxService.create).toBeCalled();
      expect(spyBoxService.create).toBeCalledWith(createBoxDto);
      expect(response).toEqual({ status: 422, success: false });
    });
  });
});
