
import { User } from '../users/users.entity';
import { Experience } from '../Experience/experience.entity';
import { HardSkill } from '../HardSkill/hardSkill.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

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

  @Column({ type: 'text', nullable: true })
  profileImageUrl: string;

  @OneToMany(() => Experience, (experience) => experience.portifolio)
  experiences: Experience[]

  @OneToMany(() => HardSkill, (hardSkills) => hardSkills.portifolio)
  hardSkills: HardSkill[]

  @OneToOne(() => User, (user) => user.portifolio)
  user: User
}
