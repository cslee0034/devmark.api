import { Injectable } from '@nestjs/common';
import { AlarmRepository } from './repository/alarm.repository';

@Injectable()
export class AlarmService {
  constructor(private readonly alarmRepository: AlarmRepository) {}

  async create(body): Promise<{ status: number; success: boolean }> {
    const createdAlarm = await this.alarmRepository.createAlarm(body);
    return { status: 201, success: true };
  }

  async findAll(user_id) {
    const readAllAlarm = await this.alarmRepository.findAllAlarmByUserId(
      user_id,
    );
    return readAllAlarm;
  }

  async findNotification(user_id) {
    const notificationAlarm = await this.alarmRepository.findNotifyAlarm(
      user_id,
    );
    return notificationAlarm;
  }

  async remove(body) {
    const deleteAlarm = await this.alarmRepository.deleteAlarm(body);
    return { status: 201, success: true };
  }
}
