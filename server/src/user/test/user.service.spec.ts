import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UnprocessableEntityException } from '@nestjs/common';

jest.mock('bcrypt');

const mockUserRepository = () => ({
  findUserByEmail: jest.fn((email) => {
    if (email === 'exist') {
      throw new UnprocessableEntityException();
    }
    return null;
  }),
  createUserLocal: jest.fn(),
});

describe('UserService', () => {
  let spyUserService: UserService;
  let spyUserRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    spyUserService = module.get<UserService>(UserService);
    spyUserRepository = module.get<UserRepository>(UserRepository);
  });

  describe('createUser', () => {
    const mockCreateUserDto: CreateUserDto = {
      email: 'test@example.com',
      nick: 'test_nick',
      password: 'test_password',
    };
    (bcrypt.hash as jest.Mock).mockResolvedValue('test_hash');

    it('새 유저 생성', async () => {
      const result = await spyUserService.createUser(mockCreateUserDto);

      expect(spyUserRepository.findUserByEmail).toBeCalledWith(
        mockCreateUserDto.email,
      );
      expect(bcrypt.hash).toBeCalledWith(mockCreateUserDto.password, 12);
      expect(spyUserRepository.createUserLocal).toBeCalledWith({
        email: mockCreateUserDto.email,
        nick: mockCreateUserDto.nick,
        password: 'test_hash',
      });
      expect(result).toEqual({ status: 201, success: true });
    });

    it('새 유저 생성 실패', async () => {
      mockCreateUserDto.email = 'exist';
      try {
        const result = await spyUserService.createUser(mockCreateUserDto);
      } catch (error) {
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });
  });
});
