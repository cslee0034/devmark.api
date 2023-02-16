import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { UserRepository } from 'src/user/repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
    super({
      clientID: process.env.KAKAO_ID,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const email = profile._json.kakao_account.email;
    const nick = profile._json.properties.nickname;
    const provider = 'kakao';
    const snsId = profile.id;

    try {
      const user = await this.userRepository.findUserKakao(snsId, provider);
      if (user === null) {
        const user = await this.userRepository.createUserKakao({
          email,
          nick,
          provider,
          snsId,
        });

        const payload = { user };

        const access_token = this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '7d',
        });

        done(null, { ...user, access_token });
      } else {
        const payload = { user };

        const access_token = this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET,
          expiresIn: '7d',
        });

        done(null, { ...user, access_token });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
}
