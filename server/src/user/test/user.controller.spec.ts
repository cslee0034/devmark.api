import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from '../../auth/auth.service';

const mockUserService = () => ({
  createUser: jest.fn((createUserDto) => {
    if (createUserDto.email && createUserDto.nick && createUserDto.password) {
      return { status: 201, success: true };
    } else {
      return { status: 422, success: false };
    }
  }),
});

const mockAuthService = () => ({
  jwtLogIn: jest.fn(),
});

describe('UserController', () => {
  let controller: UserController;
  let spyUserService: UserService;
  let spyAuthService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // Nest.js에서 제공하는 테스트 모듈을 만든다.
      controllers: [UserController],
      providers: [
        // mocking function을 제공한다.
        { provide: UserService, useFactory: mockUserService },
        // privide = 프로바이더가 사용할 이름.
        // useFactory = 프로바이더가 동작할 방식을 결정한다 (동적 프로바이더 제공).
        // UserService의 함수는 팩토리 함수에서 반환된 값(함수)으로 제공된다.
        { provide: AuthService, useFactory: mockAuthService },
      ],
    }).compile();
    // 테스트 모듈에 등록된 provider와 기타 module의 인스턴스를 생성해서 종속성 해결.

    controller = module.get<UserController>(UserController);
    // UserController의 인스턴스를 가져온다. (get()은 TestingModule의 메서드)
    spyUserService = module.get<UserService>(UserService);
    // UserService의 인스턴스를 가져온다.
  });

  describe('createUser', () => {
    it('유저 생성', async () => {
      const createUserDto: CreateUserDto = {
        email: 'testmail',
        nick: 'testnick',
        password: 'testpassword',
      };
      const response = await controller.createUser(createUserDto);

      expect(spyUserService.createUser).toBeCalled();
      expect(spyUserService.createUser).toHaveBeenCalledWith(createUserDto);
      expect(response).toEqual({ status: 201, success: true });
    });

    it('유저 생성 실패', async () => {
      const createUserDto: any = {};
      const response = await controller.createUser(createUserDto);

      expect(spyUserService.createUser).toBeCalled();
      expect(spyUserService.createUser).toHaveBeenCalledWith(createUserDto);
      expect(response).toEqual({ status: 422, success: false });
    });
  });
});
