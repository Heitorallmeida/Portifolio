
import { Portifolio } from '../Portifolio/portifolio.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Portifolio, (portifolio) => portifolio.user, { onDelete: 'CASCADE' })
  portifolio: Portifolio
}