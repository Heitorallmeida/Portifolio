import { DataSource } from 'typeorm';
import { Portifolio } from './portifolio.entity';
export declare const portifolioProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Portifolio>;
    inject: string[];
}[];
