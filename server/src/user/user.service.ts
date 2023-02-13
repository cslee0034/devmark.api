import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
// commonjs는 default import가 없음

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(body: CreateUserDto) {
    const { email, nick, password } = body;
    const newUser = await this.usersRepository.findOne({ where: { email } });
    if (newUser) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      await this.usersRepository.save({
        email,
        nick,
        password: hashPassword,
      });
    }
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
