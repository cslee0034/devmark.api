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
import { AlarmEntity } from './entities/alarm.entity';

@Controller('api/alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  create_alarm(@ReqWithUserId() body) {
    return this.alarmService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll_alarm(@ReqWithUserId() body): Promise<AlarmEntity[]> {
    return this.alarmService.findAll(body.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('notification')
  findAll_notification_alarm(@ReqWithUserId() body) {
    return this.alarmService.findNotification(body.user_id);
  }

  @Delete('')
  remove_alarm(@Param('id') id: string) {
    return this.alarmService.remove(+id);
  }
}
