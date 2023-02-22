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
import { Req, Res, UploadedFile } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { multerOptions } from 'src/common/utils/multer.options';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Controller('api/box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @UseGuards(JwtAuthGuard)
  @Post('img')
  @UseInterceptors(FileInterceptor('img', multerOptions('')))
  uploadImg(@UploadedFile() img: Express.Multer.File) {
    return { url: `http://localhost:5000/img/${img.filename}` };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async UplaodBox(@Req() req): Promise<any> {
    const user_id = req.user.id;
    const body = { ...req.body, user_id };
    return this.boxService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll(@Req() req) {
    const user_id = req.user.id;
    return this.boxService.findAll(user_id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
  //   return this.boxService.update(+id, updateBoxDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.boxService.remove(+id);
  // }
}
