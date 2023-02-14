import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일은 비워져 있을 수 없습니다.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임은 비워져 있을 수 없습니다.' })
  @MaxLength(15, { message: '닉네임은 최대 15글자입니다.' })
  nick: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호는 비워져 있을 수 없습니다.' })
  password: string;
}
