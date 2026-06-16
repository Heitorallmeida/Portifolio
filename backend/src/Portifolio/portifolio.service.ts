import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Portifolio } from './portifolio.entity';

@Injectable()
export class PortifolioService {
  constructor(
    @Inject('PORTIFOLIO_REPOSITORY')
    private portifolioRpository: Repository<Portifolio>,
  ) { }

  async findAll(): Promise<Portifolio[]> {
    return this.portifolioRpository.find({ relations: ['experiences', 'hardSkills', 'profileImage'] });
  }

  async findById(id): Promise<Portifolio> {
    return this.portifolioRpository.findOne({ where: { id: id }, relations: ['experiences', 'hardSkills'] });
  }

  async create(name: string, lastname: string, profileImageUrl?: string, aboutMe?: string): Promise<Portifolio> {
    const portifolio = new Portifolio();

    portifolio.name = name;
    portifolio.lastname = lastname;
    portifolio.aboutMe = aboutMe;

    portifolio.profileImageUrl = profileImageUrl || null;

    return await this.portifolioRpository.save(portifolio)
  }

  async update(
    id: number,
    name: string,
    lastname: string,
    profileImageUrl?: string,
    aboutMe?: string,
  ): Promise<UpdateResult> {
    const updateData: Partial<Portifolio> = {
      name,
      lastname,
      aboutMe,
      profileImageUrl: profileImageUrl || null,
    };

    return await this.portifolioRpository.update(id, updateData);
  }

  async delete(id: number): Promise<any> {
    return await this.portifolioRpository.remove({ id } as any);
  }
}
