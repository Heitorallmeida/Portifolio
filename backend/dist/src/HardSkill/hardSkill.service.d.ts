import { Repository } from 'typeorm';
import { HardSkill } from './hardSkill.entity';
import { Portifolio } from '../Portifolio/portifolio.entity';
import { CreateHardSKillDto } from 'src/dto/create-hard-skill';
export declare class HardSkillService {
    private hardSkillRepository;
    private readonly portifolioRepository;
    constructor(hardSkillRepository: Repository<HardSkill>, portifolioRepository: Repository<Portifolio>);
    findAll(): Promise<HardSkill[]>;
    create(createHardSkillDto: CreateHardSKillDto): Promise<HardSkill>;
    createAll(createHardSkillsDto: CreateHardSKillDto[]): Promise<HardSkill[]>;
    findOne(id: number): Promise<{
        [title: string]: number;
    }>;
}
