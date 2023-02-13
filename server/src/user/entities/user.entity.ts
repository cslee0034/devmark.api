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
  @IsEmail()
  @IsNotEmpty()
  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', unique: true, nullable: false, length: 15 })
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
