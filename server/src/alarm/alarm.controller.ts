import { Controller, Get, Post, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ReqWithUserId } from 'src/common/decorators/req_user_id.decorator';
import { AlarmService } from './alarm.service';
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
  findAll_notification_alarm(@ReqWithUserId() body): Promise<AlarmEntity[]> {
    return this.alarmService.findNotification(body.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('')
  remove_alarm(
    @ReqWithUserId() body,
  ): Promise<{ status: number; success: boolean }> {
    return this.alarmService.remove(body);
  }
}
