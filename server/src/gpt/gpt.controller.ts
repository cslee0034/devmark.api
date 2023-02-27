import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GptService } from './gpt.service';
import { CreateGptDto } from './dto/create-gpt.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('api/gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @UseGuards(JwtAuthGuard)
  @Post('question')
  question(@CurrentUser() user: UserEntity, @Body() gpt: CreateGptDto) {
    return this.gptService.question(user, gpt);
  }

  @UseGuards(JwtAuthGuard)
  @Post('answer')
  answer() {
    return this.gptService.answer();
  }
}
