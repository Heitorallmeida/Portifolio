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
    return this.portifolioRpository.find();
  }
  
  async findById(id): Promise<Portifolio> {
    return this.portifolioRpository.findOne({where:{id: id}, relations: ['experiences']});
  }

  async create(name: string, lastname: string): Promise<Portifolio> {
    const portifolio = new Portifolio();

    portifolio.name = name;
    portifolio.lastname = lastname;
    
    return await this.portifolioRpository.save(portifolio)
  }
}