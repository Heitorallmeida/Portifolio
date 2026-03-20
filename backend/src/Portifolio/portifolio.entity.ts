
import { Experience } from '../Experience/experience.entity';
import { HardSkill } from '../HardSkill/hardSkill.entity';
import { File } from '../files/entities/file.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Portifolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  lastname: string;

  @Column({ type: 'text', nullable: true })
  aboutMe: string;

  @OneToOne(() => File, { nullable: true })
  @JoinColumn()
  profileImage: File;

  @OneToMany(() => Experience, (experience) => experience.portifolio) 
  experiences: Experience[]

  @OneToMany(() => HardSkill, (hardSkills) => hardSkills.portifolio)
  hardSkills: HardSkill[]
}