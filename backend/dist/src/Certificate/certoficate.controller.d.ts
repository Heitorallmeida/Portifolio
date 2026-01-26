import { CertificateService } from './certificate.service';
import { Certificate } from './certificate.entity';
import { CreateCertificateDto } from 'src/dto/create-certificate';
export declare class CertificateController {
    private readonly certificateService;
    constructor(certificateService: CertificateService);
    findAll(): Promise<string>;
    create(createCertificateDto: CreateCertificateDto): Promise<Certificate>;
    createAll(createCertificateDto: CreateCertificateDto[]): Promise<Certificate[]>;
    findOne(id: number): Promise<Certificate[]>;
}
