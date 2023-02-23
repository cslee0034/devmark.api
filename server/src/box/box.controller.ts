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
import { ReqWithUserId } from 'src/common/decorators/req_user_id.decorator';
import { multerOptions } from 'src/common/utils/multer.options';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { BoxEntity } from './entities/box.entity';

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
  async UplaodBox(
    @ReqWithUserId() body,
  ): Promise<{ status: number; success: boolean }> {
    return this.boxService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll(@ReqWithUserId() body): Promise<BoxEntity> {
    const user_id = body.user_id;
    return this.boxService.findAll(user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('')
  update(@ReqWithUserId() body): Promise<{ status: number; success: boolean }> {
    return this.boxService.update(body);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.boxService.remove(+id);
  // }
}
