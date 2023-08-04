import { Repository } from 'typeorm';
import { Experience } from './experience.entity';
import { Portifolio } from 'src/Portifolio/portifolio.entity';
import { CreateExperienceDto } from 'src/dto/create-experience';
export declare class ExperienceService {
    private experienceRpository;
    private readonly portifolioRepository;
    constructor(experienceRpository: Repository<Experience>, portifolioRepository: Repository<Portifolio>);
    findAll(): Promise<Experience[]>;
    create(title: any, initialDate: any, finishDate: any, current: boolean, portifolioId: any, image: any): Promise<Experience>;
    createAll(createExperiencesDto: CreateExperienceDto[]): Promise<Experience[]>;
}
