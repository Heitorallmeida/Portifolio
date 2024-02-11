import { Repository } from 'typeorm';
import { Certificate } from './certificate.entity';
import { Portifolio } from '../Portifolio/portifolio.entity';
import { CreateCertificateDto } from 'src/dto/create-certificate';
export declare class CertificateService {
    private certificateRepository;
    private readonly portifolioRepository;
    constructor(certificateRepository: Repository<Certificate>, portifolioRepository: Repository<Portifolio>);
    findAll(): Promise<Certificate[]>;
    create(createCertificateDto: CreateCertificateDto): Promise<Certificate>;
    createAll(createCertificateDto: CreateCertificateDto[]): Promise<Certificate[]>;
    findOne(id: number): Promise<Certificate[]>;
}
