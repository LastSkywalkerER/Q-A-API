import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Questions } from '@/questions/questions.entity';
import { Users } from '@/users/users.entity';

@Entity()
export class Answers {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne((type) => Questions, (question) => question.id)
  @JoinColumn({
    name: 'questionId',
    referencedColumnName: 'id',
  })
  @Column({ name: 'questionId' })
  questionId: string;

  @Column()
  text: string;

  @ManyToOne((type) => Users, (user) => user.email)
  @JoinColumn({
    name: 'author',
    referencedColumnName: 'email',
  })
  @Column()
  author: string;

  @Column()
  rating: number;

  @Column()
  dateOfCreation: string;

  @Column()
  dateOfUpdate: string;
}
