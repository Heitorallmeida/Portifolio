
import { Portifolio } from '../Portifolio/portifolio.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class HardSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  initialDate: Date;

  @Column()
  finishDate: Date;

  @Column()
  current: boolean;

  @Column('float')
  percentage: number;
  
  @Column()
  title: string;

  @ManyToOne(() => Portifolio, (portifolio) => portifolio.id)
  portifolio: Portifolio

}