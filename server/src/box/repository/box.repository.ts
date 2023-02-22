import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoxDto } from '../dto/create-box.dto';
import { BoxEntity } from '../entities/box.entity';

@Injectable()
export class BoxRepository {
  constructor(
    @InjectRepository(BoxEntity)
    private readonly boxRepository: Repository<BoxEntity>,
  ) {}

  async createBox(body: CreateBoxDto): Promise<BoxEntity> {
    try {
      console.log(body);
      const box = {
        ...body,
        user: { id: Number(body.user_id) },
        // box property 뿐 아니라 user property로 포함한다.
      };
      const result = await this.boxRepository.save(box);
    } catch (error) {
      throw new Error('error while saving box');
    }
    return;
  }
}
