import { DataSource } from 'typeorm';
import { File } from './file.entity';
export declare const fileProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<File>;
    inject: string[];
}[];
