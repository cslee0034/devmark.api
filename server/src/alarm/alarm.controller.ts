import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { UpdateAlarmDto } from './dto/update-alarm.dto';

@Controller('api/alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Post('')
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmService.create(createAlarmDto);
  }

  @Get('')
  findAll() {
    return this.alarmService.findAll();
  }

  @Get('notification')
  findOne(@Param('id') id: string) {
    return this.alarmService.findOne(+id);
  }

  @Delete('')
  remove(@Param('id') id: string) {
    return this.alarmService.remove(+id);
  }
}
