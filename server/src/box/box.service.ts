import { Injectable } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { BoxRepository } from './repository/box.repository';

@Injectable()
export class BoxService {
  constructor(private readonly boxRepository: BoxRepository) {}

  async create(body: CreateBoxDto) {
    const newBox = await this.boxRepository.createBox(body);
    return { status: 200, success: true };
  }

  findAll() {
    return `This action returns all box`;
  }

  findOne(id: number) {
    return `This action returns a #${id} box`;
  }

  update(id: number, updateBoxDto: UpdateBoxDto) {
    return `This action updates a #${id} box`;
  }

  remove(id: number) {
    return `This action removes a #${id} box`;
  }
}
