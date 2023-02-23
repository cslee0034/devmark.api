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

  async findAll(user_id: number) {
    const boxs = await this.boxRepository.findAllBoxByUserId(user_id);
    return boxs;
  }

  async update(body: UpdateBoxDto) {
    const updateBox = await this.boxRepository.updateBox(body);
    const deleteImg = await this.boxRepository.deleteImg(body);
    return { status: 200, success: true };
  }

  remove(id: number) {
    return `This action removes a #${id} box`;
  }
}
