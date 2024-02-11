
import { Certificate } from 'src/Certificate/certificate.entity';
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

  @OneToMany(() => Experience, (experience) => experience.portifolio) 
  experiences: Experience[]

  @OneToMany(() => HardSkill, (hardSkills) => hardSkills.portifolio)
  hardSkills: HardSkill[]
  
  @OneToMany(() => Certificate, (certificates) => certificates.portifolio)
  certificates: Certificate[]
}