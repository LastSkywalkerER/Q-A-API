import { Tags } from '@/tags/tags.entity';

export class CreateQuestionDto {
  readonly title: string;
  readonly description: string;
  readonly tags: Tags[];
}
