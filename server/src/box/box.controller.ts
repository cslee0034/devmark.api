import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Controller('api/box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('img')
  @UseInterceptors(FileInterceptor('img'))
  uploadImg(@UploadedFile() img: Array<Express.Multer.File>) {
    console.log(img);
    return 'uploadImg';
  }

  // @Get()
  // findAll() {
  //   return this.boxService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.boxService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
  //   return this.boxService.update(+id, updateBoxDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.boxService.remove(+id);
  // }
}
