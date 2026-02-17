import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Portifolio } from './portifolio.entity';

@Injectable()
export class PortifolioService {
  constructor(
    @Inject('PORTIFOLIO_REPOSITORY')
    private portifolioRpository: Repository<Portifolio>,
  ) {}

  async findAll(): Promise<Portifolio[]> {
    return this.portifolioRpository.find({ relations: ['experiences', 'hardSkills', 'certificates', 'profileImage']});
  }
  
  async findById(id): Promise<Portifolio> {
    return this.portifolioRpository.findOne({where:{id: id}, relations: ['experiences', 'hardSkills', 'certificates', 'profileImage']});
  }

  async create(name: string, lastname: string, profileImageId?: number): Promise<Portifolio> {
    const portifolio = new Portifolio();

    portifolio.name = name;
    portifolio.lastname = lastname;
    
    if (profileImageId) {
      portifolio.profileImage = { id: profileImageId } as any;
    }
    
    return await this.portifolioRpository.save(portifolio)
  }
}