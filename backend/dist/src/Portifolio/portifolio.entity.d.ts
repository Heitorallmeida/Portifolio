import { Certificate } from '../Certificate/certificate.entity';
import { Experience } from '../Experience/experience.entity';
import { HardSkill } from '../HardSkill/hardSkill.entity';
export declare class Portifolio {
    id: number;
    name: string;
    lastname: string;
    experiences: Experience[];
    hardSkills: HardSkill[];
    certificates: Certificate[];
}
