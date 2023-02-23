import { Injectable } from '@nestjs/common';
import { UpdateAlarmDto } from './dto/update-alarm.dto';
import { AlarmRepository } from './repository/alarm.repository';

@Injectable()
export class AlarmService {
  constructor(private readonly alarmRepository: AlarmRepository) {}
  async create(body): Promise<{ status: number; success: boolean }> {
    const createdAlarm = await this.alarmRepository.createAlarm(body);
    return { status: 201, success: true };
  }

  findAll() {
    return `This action returns all alarm`;
  }

  findNotification(id: number) {
    return `This action returns a #${id} alarm`;
  }

  update(id: number, updateAlarmDto: UpdateAlarmDto) {
    return `This action updates a #${id} alarm`;
  }

  remove(id: number) {
    return `This action removes a #${id} alarm`;
  }
}
