import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateAlarmDto {
  @IsString()
  alarmName: string;
  @IsDate()
  date: Date;
  @IsNumber()
  user_id: number;
}
