import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repository/user.repository';
// commonjs는 default import가 없음

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // 유저 생성
  async createUser(body: CreateUserDto) {
    const { email, nick, password } = body;
    const newUser = await this.userRepository.checkByEmail(email);
    if (newUser) {
      throw new UnprocessableEntityException('이미 존재하는 사용자입니다.');
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await this.userRepository.create({
      email,
      nick,
      password: hashPassword,
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
