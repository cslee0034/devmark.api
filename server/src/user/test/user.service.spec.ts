import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: { findUserByEmail: jest.fn(), createUserLocal: jest.fn() },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('createUser', () => {
    const mockCreateUserDto: CreateUserDto = {
      email: 'test@example.com',
      nick: 'test_nick',
      password: 'test_password',
    };

    it('새 유저 생성', async () => {
      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);
      jest.spyOn(userRepository, 'createUserLocal').mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('test_hash');
      const result = await userService.createUser(mockCreateUserDto);

      expect(userRepository.findUserByEmail).toBeCalledWith(
        mockCreateUserDto.email,
      );
      expect(bcrypt.hash).toBeCalledWith(mockCreateUserDto.password, 12);
      expect(userRepository.createUserLocal).toBeCalledWith({
        email: mockCreateUserDto.email,
        nick: mockCreateUserDto.nick,
        password: 'test_hash',
      });
      expect(result).toEqual({ status: 201, success: true });
    });
  });
});
