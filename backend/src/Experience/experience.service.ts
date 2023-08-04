import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Experience } from './experience.entity';
import { Portifolio } from 'src/Portifolio/portifolio.entity';
import { CreateExperienceDto } from 'src/dto/create-experience';

@Injectable()
export class ExperienceService {
  constructor(
    @Inject('EXPERIENCE_REPOSITORY')
    private experienceRpository: Repository<Experience>,
    @Inject('PORTIFOLIO_REPOSITORY')
    private readonly portifolioRepository: Repository<Portifolio>
  ) {}

  async findAll(): Promise<Experience[]> {
    return this.experienceRpository.find();
  }

  async create(title, initialDate, finishDate, current = false, portifolioId, image): Promise<Experience> {
    const experience = new Experience(); 

    experience.title = title
    experience.initialDate = initialDate;
    experience.finishDate = finishDate;
    experience.current = current;
    experience.image = image
    const portifolio =  await this.portifolioRepository.findOne({where:{id: portifolioId}});
    experience.portifolio = portifolio;
    
    const experienceSaved =  await this.experienceRpository.save(experience)

    return experienceSaved
  }
  async createAll(createExperiencesDto: CreateExperienceDto[]): Promise<Experience[]> {
    const experiences: Experience[] = [];
    createExperiencesDto.forEach(async (experiencesItem)=>{
      const experience = new Experience(); 

      experience.title = experiencesItem.title
      experience.initialDate = experiencesItem.initialDate;
      experience.finishDate = experiencesItem.finishDate;
      experience.current = experiencesItem.current;
      experience.image = experiencesItem.image
      const portifolio =  await this.portifolioRepository.findOne({where:{id: experiencesItem.portifolioId}});
      experience.portifolio = portifolio;
      
      const experienceSaved =  await this.experienceRpository.save(experience)
      experiences.push(experienceSaved)
    })
   

    return experiences
  }
}