import { Test, TestingModule } from '@nestjs/testing';
import { BoxService } from '../box.service';
import { BoxRepository } from '../repository/box.repository';
import { CreateBoxDto } from '../dto/create-box.dto';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateBoxDto } from '../dto/update-box.dto';

jest.mock('bcrypt');

const mockBoxRepository = () => ({
  createBox: jest.fn((createBoxDto) => {
    if (createBoxDto.boxName && createBoxDto.img && createBoxDto.user_id) {
      return { box: 1 };
    } else {
      throw new InternalServerErrorException();
    }
  }),

  findAllBoxByUserId: jest.fn((user_id) => {
    if (user_id === 1) {
      return { box: 1 };
    }
    return NotFoundException;
  }),

  updateBox: jest.fn((updateBoxDto) => {
    if (
      updateBoxDto.boxName &&
      updateBoxDto.img &&
      updateBoxDto.user_id &&
      updateBoxDto.boxId &&
      updateBoxDto.deleteImg
    ) {
      return { status: 200, success: true };
    } else {
      return { status: 422, success: false };
    }
  }),

  deleteBox: jest.fn((boxId) => {
    if (boxId) {
      return { status: 422, success: true };
    } else {
      return { status: 422, success: false };
    }
  }),

  deleteImg: jest.fn(() => {
    return true;
  }),
});

describe('BoxService', () => {
  let spyBoxService: BoxService;
  let spyBoxRepository: BoxRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoxService,
        {
          provide: BoxRepository,
          useFactory: mockBoxRepository,
        },
      ],
    }).compile();

    spyBoxService = module.get<BoxService>(BoxService);
    spyBoxRepository = module.get<BoxRepository>(BoxRepository);
  });

  describe('createBox', () => {
    const createBoxDto: CreateBoxDto = {
      boxName: 'test_boxname',
      img: 'test_img',
      user_id: 1,
    };

    it('새 박스 생성', async () => {
      const result = await spyBoxService.create(createBoxDto);

      expect(spyBoxRepository.createBox).toBeCalled();
      expect(spyBoxRepository.createBox).toBeCalledWith({
        boxName: createBoxDto.boxName,
        img: createBoxDto.img,
        user_id: createBoxDto.user_id,
      });
      expect(result).toEqual({ status: 201, success: true });
    });

    it('새 박스 생성 실패', async () => {
      createBoxDto.boxName = null;
      try {
        const result = await spyBoxService.create(createBoxDto);
      } catch (error) {
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('findAll', () => {
    const user_id = 1;

    it('박스 찾기 성공', async () => {
      const result = await spyBoxService.findAll(user_id);

      expect(spyBoxRepository.findAllBoxByUserId).toBeCalled();
      expect(spyBoxRepository.findAllBoxByUserId).toBeCalledWith(user_id);
      expect(result).toEqual({ box: 1 });
    });

    it('박스 찾기 실패', async () => {
      const user_id = 2;
      try {
        const result = await spyBoxService.findAll(user_id);
      } catch (error) {
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    const body: UpdateBoxDto = {
      boxName: 'test_boxname',
      img: 'test_img',
      user_id: 1,
      boxId: '1',
      deleteImg: 'test_delete',
    };

    it('박스 업데이트 성공', async () => {
      const result = await spyBoxService.update(body);

      expect(spyBoxRepository.updateBox).toBeCalledWith(body);
      expect(spyBoxRepository.deleteImg).toBeCalledWith(body);
      expect(result).toEqual({ status: 200, success: true });
    });

    it('박스 업데이트 실패', async () => {
      body.boxName = null;
      try {
        const result = await spyBoxService.update(body);
      } catch (error) {
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf({ status: 422, success: false });
      }
    });
  });

  describe('delete', () => {
    const body = { boxId: 1, deleteImg: 'delete_img' };

    it('박스 삭제 성공', async () => {
      const result = await spyBoxService.remove(body);

      expect(spyBoxRepository.deleteBox).toBeCalledWith(body);
      expect(spyBoxRepository.deleteImg).toBeCalledWith(body);
      expect(result).toEqual({ status: 200, success: true });
    });

    it('박스 삭제 실패', async () => {
      body.boxId = null;
      try {
        const result = await spyBoxService.remove(body);
      } catch (error) {
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf({ status: 422, success: false });
      }
    });
  });
});
