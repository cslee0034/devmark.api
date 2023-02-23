import { Module } from '@nestjs/common';
import { AlarmService } from './alarm.service';
import { AlarmController } from './alarm.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // TypeORM
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  controllers: [AlarmController],
  providers: [AlarmService],
})
export class AlarmModule {}
