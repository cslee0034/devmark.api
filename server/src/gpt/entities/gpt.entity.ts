import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'GPT',
})
export class GptEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: true })
  techStack;
}
