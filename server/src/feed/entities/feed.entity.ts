import { maxLength, MaxLength } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column } from 'typeorm';

export class FeedEntity extends CommonEntity {
  @MaxLength(15, { message: '피드 이름은 최대 15글자입니다.' })
  @Column({ nullable: false })
  FeedName: string;

  @MaxLength(200, { message: '피드 내용의 최대 길이는 200글자 입니다.' })
  @Column({ nullable: false })
  FeedContent: string;

  @Column({ length: 200, nullable: true })
  img: string;

  @Column({ length: 2083 })
  URL: string;
}
