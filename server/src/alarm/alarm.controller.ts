import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ReqWithUserId } from 'src/common/decorators/req_user_id.decorator';
import { AlarmService } from './alarm.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';

@Controller('api/alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create_alarm(@ReqWithUserId() body) {
    return this.alarmService.create(body);
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
