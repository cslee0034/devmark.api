import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async checkByEmail(email: string): Promise<UserEntity> {
    const result = await this.userRepository.findOne({ where: { email } });
    return result;
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }
}
