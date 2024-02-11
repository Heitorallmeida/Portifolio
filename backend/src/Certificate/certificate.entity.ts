
import { Portifolio } from '../Portifolio/portifolio.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image_name: string;

  @Column()
  image: string;

  @ManyToOne(() => Portifolio, (portifolio) => portifolio.id)
  portifolio: Portifolio
}