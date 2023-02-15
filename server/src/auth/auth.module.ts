import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.localStrategy';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    // ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // 기본적 strategy에 대한 설정을 해줄 수 있다, 세션쿠키 미사용.

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),

    forwardRef(() => UserModule),
    // 순환 종속성 해결.
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
