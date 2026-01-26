import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from 'src/dto/create-experience';
import { Experience } from './experience.entity';
export declare class ExperienceController {
    private readonly experienceService;
    constructor(experienceService: ExperienceService);
    findAll(): Promise<string>;
    create(createExperienceDto: CreateExperienceDto): Promise<Experience>;
    createAll(createExperiencesDto: CreateExperienceDto[]): Promise<Experience[]>;
}
