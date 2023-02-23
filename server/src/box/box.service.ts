import { Injectable } from '@nestjs/common';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { BoxRepository } from './repository/box.repository';

@Injectable()
export class BoxService {
  constructor(private readonly boxRepository: BoxRepository) {}

  async createBox(body: CreateBoxDto) {
    const newBox = await this.boxRepository.createBox(body);
    return { status: 201, success: true };
  }

  async findAll(user_id: number) {
    const boxs = await this.boxRepository.findAllBoxByUserId(user_id);
    return boxs;
  }

  async update(body: UpdateBoxDto) {
    const updateBox = await this.boxRepository.updateBox(body);
    if (updateBox) {
      const deleteImg = await this.boxRepository.deleteImg(body);
      return { status: 200, success: true };
    }
    return { status: 422, success: false };
    // 요청 문법은 맞지만 지시에 따를 수 없음
  }

  async remove(body: { boxId: number; deleteImg: string }) {
    const deleteBox = await this.boxRepository.deleteBox(body);
    if (deleteBox) {
      const deleteImg = await this.boxRepository.deleteImg(body);
      return { status: 200, success: true };
    }
    return { status: 422, success: false };
    // 요청 문법은 맞지만 지시에 따를 수 없음
  }
}
