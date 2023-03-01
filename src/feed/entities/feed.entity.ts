import { MaxLength } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'feed',
})
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

  // relations

  @ManyToOne(() => UserEntity, (user) => user.feeds, {
    onDelete: 'CASCADE',
    // 사용자가 삭제되면 블로그도 삭제된다.
  })
  @JoinColumn([
    // foreign key 정보들
    {
      name: 'user_id',
      // db에 저장되는 필드 이름
      referencedColumnName: 'id',
      // USER의 id
    },
  ])
  user: UserEntity;
}
