import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@Controller('api/alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Post('')
  create_alarm(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmService.create(createAlarmDto);
  }

  @Get('')
  findAll_alarm() {
    return this.alarmService.findAll();
  }

  @Get('notification')
  findAll_notification_alarm(@Param('id') id: string) {
    return this.alarmService.findNotification(+id);
  }

  @Delete('')
  remove_alarm(@Param('id') id: string) {
    return this.alarmService.remove(+id);
  }
}
