import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Payload } from './jwt.payload';
import { UserRepository } from 'src/user/repository/user.repository';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 헤더의 토큰으로부터 추출.
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      // jwt 만료 기간.
    });
  }
  //   async validate(payload: Payload) {}
}
