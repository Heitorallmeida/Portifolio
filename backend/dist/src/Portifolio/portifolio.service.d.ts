import { Repository } from 'typeorm';
import { Portifolio } from './portifolio.entity';
export declare class PortifolioService {
    private portifolioRpository;
    constructor(portifolioRpository: Repository<Portifolio>);
    findAll(): Promise<Portifolio[]>;
    findById(id: any): Promise<Portifolio>;
    create(name: string, lastname: string): Promise<Portifolio>;
}
