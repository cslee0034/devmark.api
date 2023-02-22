import { MaxLength } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'BOX',
})
export class BoxEntity extends CommonEntity {
  @MaxLength(15, { message: '북마크 상자는 최대 15글자입니다.' })
  @Column({ type: 'varchar', nullable: true, length: 200 })
  boxName: string;

  @Column({ type: 'varchar', nullable: true, length: 200 })
  img: string;

  // relations

  @ManyToOne(() => UserEntity, (user) => user.boxs, {
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
