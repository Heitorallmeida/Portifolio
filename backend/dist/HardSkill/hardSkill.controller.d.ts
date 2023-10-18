import { HardSkillService } from './hardSkill.service';
import { HardSkill } from './hardSkill.entity';
import { CreateHardSKillDto } from 'src/dto/create-hard-skill';
export declare class HardSkillController {
    private readonly hardSkillService;
    constructor(hardSkillService: HardSkillService);
    findAll(): Promise<string>;
    create(createExperienceDto: CreateHardSKillDto): Promise<HardSkill>;
    createAll(createHardSkillsDto: CreateHardSKillDto[]): Promise<HardSkill[]>;
    findOne(id: number): Promise<{
        [title: string]: number;
    }>;
}
