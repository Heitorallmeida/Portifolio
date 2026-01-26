import { PortifolioService } from './portifolio.service';
import { CreatePortifolioDto } from 'src/dto/create-portifolio';
import { Portifolio } from './portifolio.entity';
export declare class PortifolioController {
    private readonly portifolioService;
    constructor(portifolioService: PortifolioService);
    findAll(): Promise<string>;
    findOne(params: any): Promise<string>;
    create(createPortifolioDto: CreatePortifolioDto): Promise<Portifolio>;
}
