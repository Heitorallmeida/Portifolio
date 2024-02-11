import { Certificate } from 'src/Certificate/certificate.entity';
import { Experience } from 'src/Experience/experience.entity';
import { HardSkill } from 'src/HardSkill/hardSkill.entity';
export declare class Portifolio {
    id: number;
    name: string;
    lastname: string;
    experiences: Experience[];
    hardSkills: HardSkill[];
    certificates: Certificate[];
}
