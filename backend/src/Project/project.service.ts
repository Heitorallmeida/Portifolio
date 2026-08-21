import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Portifolio } from '../Portifolio/portifolio.entity';
import { CreateProjectDto } from '../dto/create-project';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_REPOSITORY') private readonly projectRepository: Repository<Project>,
    @Inject('PORTIFOLIO_REPOSITORY') private readonly portifolioRepository: Repository<Portifolio>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({ order: { featured: 'DESC', initialDate: 'DESC' } });
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const portifolio = await this.portifolioRepository.findOne({ where: { id: dto.portifolioId } });
    if (!portifolio) throw new NotFoundException('Portifolio not found');

    return this.projectRepository.save(
      this.projectRepository.create({
        title: dto.title,
        description: dto.description,
        image: dto.image || null,
        repositoryUrl: dto.repositoryUrl || null,
        liveUrl: dto.liveUrl || null,
        technologies: dto.technologies || [],
        initialDate: new Date(dto.initialDate),
        finishDate: dto.finishDate ? new Date(dto.finishDate) : null,
        current: dto.current ?? false,
        featured: dto.featured ?? false,
        portifolio,
      }),
    );
  }
}
