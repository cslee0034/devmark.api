import { PickType } from '@nestjs/mapped-types';
import { GptEntity } from '../entities/gpt.entity';

export class CreateGptDto extends PickType(GptEntity, ['techStack'] as const) {}
