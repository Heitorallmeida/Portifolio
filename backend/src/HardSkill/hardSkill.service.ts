import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HardSkill } from './hardSkill.entity';
import { Portifolio } from '../Portifolio/portifolio.entity';
import { CreateHardSKillDto } from 'src/dto/create-hard-skill';

@Injectable()
export class HardSkillService {
  constructor(
    @Inject('HARD_SKILL_REPOSITORY')
    private hardSkillRepository: Repository<HardSkill>,
    @Inject('PORTIFOLIO_REPOSITORY')
    private readonly portifolioRepository: Repository<Portifolio>
  ) {}

  async findAll(): Promise<HardSkill[]> {
    return this.hardSkillRepository.find();
  }

 

  async create(createHardSkillDto: CreateHardSKillDto): Promise<HardSkill> {
    const { title, initialDate, finishDate, current = false, portifolioId} = createHardSkillDto
    const calculateDateDiff = (initialDate: Date,finishDate: Date) => {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      
      const utc1 = Date.UTC(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate());
      const utc2 = Date.UTC(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());
    
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
    const calculatePercentage = (initialDateExperience: Date, finishDateExperience: Date):number => {
      const experienceDays = calculateDateDiff(new Date(initialDateExperience), new Date(finishDateExperience));
      const initialExperience = new Date("2019-07-01T08:00:00"); //Date(2019,07,01)
      const now = new Date();

      const totalExperienceDays = calculateDateDiff(initialExperience, now);

      const percentage = (experienceDays * 100)/totalExperienceDays;

      return percentage;
    }

    const experience = new HardSkill(); 

    experience.title = title
    experience.initialDate = initialDate;
    experience.finishDate = finishDate;
    experience.current = current;
    experience.percentage = calculatePercentage(experience.initialDate, experience.finishDate)
    
    
    const portifolio =  await this.portifolioRepository.findOne({where:{id: portifolioId}});
    experience.portifolio = portifolio;
    
    const experienceSaved =  await this.hardSkillRepository.save(experience)

    return experienceSaved
  }

  async createAll(createHardSkillsDto: CreateHardSKillDto[]): Promise<HardSkill[]>{
    const hardSkills: HardSkill[] = [];

    createHardSkillsDto.forEach(async (hardSkill) => {
      const { title, initialDate, finishDate, current = false, portifolioId} = hardSkill
      const calculateDateDiff = (initialDate: Date,finishDate: Date) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        
        const utc1 = Date.UTC(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate());
        const utc2 = Date.UTC(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      }

      const calculatePercentage = (initialDateExperience: Date, finishDateExperience: Date):number => {
        const experienceDays = calculateDateDiff(new Date(initialDateExperience), new Date(finishDateExperience));
        const initialExperience = new Date("2019-07-01T08:00:00");
        const now = new Date();

        const totalExperienceDays = calculateDateDiff(initialExperience, now);

        const percentage = (experienceDays * 100)/totalExperienceDays;

        return percentage;
      }

      const hardSkillEntity = new HardSkill(); 

      hardSkillEntity.title = title
      hardSkillEntity.initialDate = initialDate;
      hardSkillEntity.finishDate = finishDate;
      hardSkillEntity.current = current;
      hardSkillEntity.percentage = calculatePercentage(hardSkillEntity.initialDate, hardSkillEntity.finishDate)
    
    
      const portifolio =  await this.portifolioRepository.findOne({where:{id: portifolioId}});
      hardSkillEntity.portifolio = portifolio;
    
      const hardSkillSaved =  await this.hardSkillRepository.save(hardSkillEntity)
      hardSkills.push(hardSkillSaved)
    })
  
    return hardSkills;
  }

  async findOne(id: number): Promise<{ [title: string]: number; }>{
    const portifolio = await this.portifolioRepository.findOne({where:  {id: id}});
    const hardSkills = await this.hardSkillRepository.find({where: {portifolio: portifolio}});

    const resultado = hardSkills.reduce((acc, objeto) => {
      const { title, percentage } = objeto;
      if (acc[title]) {
        acc[title] += percentage;
      } else {
        acc[title] = percentage;
      }
      return acc;
    }, {} as { [title: string]: number });

    return resultado;
  }
}