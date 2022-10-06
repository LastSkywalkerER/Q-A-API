import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
