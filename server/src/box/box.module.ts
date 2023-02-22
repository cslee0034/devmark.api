import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoxService } from './box.service';
import { BoxController } from './box.controller';
import { BoxEntity } from './entities/box.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoxEntity])],
  controllers: [BoxController],
  providers: [BoxService],
})
export class BoxModule {}
