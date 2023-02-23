import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlarmEntity } from '../entities/alarm.entity';

@Injectable()
export class AlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly bookmarkRepository: Repository<AlarmEntity>,
  ) {}

  async createAlarm(body) {
    const alarm = {
      ...body,
      user: { id: Number(body.user_id) },
    };
    try {
      const result = await this.bookmarkRepository.save(alarm);
    } catch (error) {
      throw new InternalServerErrorException('error while saving bookmark');
      // 내부 서버 에러 500
    }
  }
}
