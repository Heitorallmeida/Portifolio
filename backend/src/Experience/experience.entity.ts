
import { Portifolio } from '../Portifolio/portifolio.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  initialDate: Date;

  @Column()
  finishDate: Date;

  @Column()
  current: boolean;
  
  @Column()
  image: string;
  
  @Column()
  title: string;

  @ManyToOne(() => Portifolio, (portifolio) => portifolio.experiences)
  portifolio: Portifolio

}