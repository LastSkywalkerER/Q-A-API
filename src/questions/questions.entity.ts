import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Users } from '@/users/users.entity';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  rating: number;

  @ManyToOne((type) => Users, (user) => user.email)
  @JoinColumn({
    name: 'author',
    referencedColumnName: 'email',
  })
  @Column()
  author: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('text', { array: true })
  tags: string[];

  @Column()
  dateOfCreation: string;

  @Column()
  dateOfUpdate: string;
}
