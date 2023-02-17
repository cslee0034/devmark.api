import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { KakaoAuthGuard } from 'src/auth/guard/kakao.guard';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    return HttpStatus.OK;
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req, @Res() res): Promise<any> {
    const access_token = req.user.access_token;
    res.cookie('access_token', access_token);
    res.redirect(`http://localhost:3000/redirect`);
    res.end();
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    return HttpStatus.OK;
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req, @Res() res): Promise<any> {
    const access_token = req.user.access_token;
    res.cookie('access_token', access_token);
    res.redirect(`http://localhost:3000/redirect`);
    res.end();
  }
}
