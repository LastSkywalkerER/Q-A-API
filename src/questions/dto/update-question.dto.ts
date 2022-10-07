import { Tags } from '@/tags/entities/tags.entity';

export class UpdateQuestionDto {
  readonly title: string;
  readonly description: string;
  readonly tags?: Tags[];
  readonly id: string;
}
