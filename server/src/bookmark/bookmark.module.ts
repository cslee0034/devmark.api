import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkEntity } from './entities/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookmarkEntity])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
