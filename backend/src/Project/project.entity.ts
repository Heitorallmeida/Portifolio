import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Portifolio } from '../Portifolio/portifolio.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  image: string | null;

  @Column({ type: 'text', nullable: true })
  repositoryUrl: string | null;

  @Column({ type: 'text', nullable: true })
  liveUrl: string | null;

  @Column({ type: 'text', array: true, default: () => "'{}'" })
  technologies: string[];

  @Column({ type: 'timestamp' })
  initialDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishDate: Date | null;

  @Column({ default: false })
  current: boolean;

  @Column({ default: false })
  featured: boolean;

  @ManyToOne(() => Portifolio, (portifolio) => portifolio.projects, { onDelete: 'CASCADE' })
  portifolio: Portifolio;
}
