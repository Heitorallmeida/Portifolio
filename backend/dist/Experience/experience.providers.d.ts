import { DataSource } from 'typeorm';
import { Experience } from './experience.entity';
export declare const experienceProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Experience>;
    inject: string[];
}[];
