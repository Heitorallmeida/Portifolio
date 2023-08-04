
import { Experience } from 'src/Experience/experience.entity';
import { HardSkill } from 'src/HardSkill/hardSkill.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Portifolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  lastname: string;

  @OneToMany(() => Experience, (experience) => experience.portifolio) // note: we will create author property in the Photo class below
  experiences: Experience[]

  @OneToMany(() => HardSkill, (experience) => experience.portifolio) // note: we will create author property in the Photo class below
  hardSkills: HardSkill[]

}