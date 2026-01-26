import { DataSource } from 'typeorm';
import { HardSkill } from './hardSkill.entity';
export declare const hardSkillProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<HardSkill>;
    inject: string[];
}[];
