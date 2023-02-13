import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column } from 'typeorm';

enum ProviderType {
  Local = 'local',
  Kakao = 'kakao',
  Github = 'github',
}
@Entity()
export class UserEntity extends CommonEntity {
  @IsEmail({}, { message: '이메일 형식을 확인 해주세요' })
  @IsNotEmpty({ message: '이메일은 비워져 있을 수 없습니다.' })
  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '이름을 작성해주세요.' })
  @Column({ type: 'varchar', unique: true, nullable: false })
  @Length(1, 15, { message: '닉네임은 1~15자 이내로 작성해야 합니다.' })
  nick: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  password: string;

  @Column({
    type: 'enum',
    enum: ProviderType,
    default: ProviderType.Local,
  })
  provider: ProviderType;

  @Column({ type: 'varchar', nullable: true })
  snsId: string;
}
