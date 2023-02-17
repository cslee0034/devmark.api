import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateKakaoUserDto } from 'src/auth/dto/create-kakao.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity> {
    const result = await this.userRepository.findOne({ where: { email } });
    return result;
  }

  async createUserLocal(user: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async findUserByIdWithoutPassword(
    userId: string,
  ): Promise<UserEntity | null> {
    const id = parseInt(userId, 10);
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'nick', 'provider'],
      where: { id },
    });
    return user;
  }

  async findUserOauth(snsId: string, provider: any): Promise<UserEntity> {
    const result = await this.userRepository.findOne({
      where: { snsId, provider },
    });
    return result;
  }

  async createUserOauth(user: CreateKakaoUserDto): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }
}
