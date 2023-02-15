import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('registration')
  async createUser(@Body() body: CreateUserDto) {
    await this.userService.createUser(body);
    return { status: 201, success: true };
  }

  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @UseGuards(JwtAuthGuard)
  // Guards에서 인증처리된 것을 req에 넘겨준다.
  @Get('info')
  findOne(@CurrentUser() user) {
    // 커스텀 데코레이터
    return user;
    // user를 readonly로 넘겨준다.
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
