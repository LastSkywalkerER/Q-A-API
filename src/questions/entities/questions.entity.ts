import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Tags } from '@/tags/entities/tags.entity';
import { Users } from '@/users/entities/users.entity';

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

  @ManyToMany(() => Tags)
  @JoinTable()
  tags: Tags[];

  @Column()
  dateOfCreation: string;

  @Column()
  dateOfUpdate: string;
}
