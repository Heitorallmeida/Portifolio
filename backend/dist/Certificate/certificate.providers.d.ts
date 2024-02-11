import { DataSource } from 'typeorm';
import { Certificate } from './certificate.entity';
export declare const certificateProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Certificate>;
    inject: string[];
}[];
