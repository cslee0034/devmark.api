import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class UserEntity extends CommonEntity {
  @IsEmail()
  @IsNotEmpty({ message: '이메일은 비워져 있을 수 없습니다.' })
  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '닉네임은 비워져 있을 수 없습니다.' })
  @MaxLength(15, { message: '닉네임은 최대 15글자입니다.' })
  @Column({ type: 'varchar', unique: false, nullable: false })
  nick: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  password: string;

  @Column({ default: 'local' })
  provider: string;

  @Column({ type: 'varchar', nullable: true })
  snsId: string;
}
