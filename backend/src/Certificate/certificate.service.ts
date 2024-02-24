import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Certificate } from './certificate.entity';
import { Portifolio } from '../Portifolio/portifolio.entity';
import { CreateCertificateDto } from 'src/dto/create-certificate';

@Injectable()
export class CertificateService {
  constructor(
    @Inject('CERTIFICATE_REPOSITORY')
    private certificateRepository: Repository<Certificate>,
    @Inject('PORTIFOLIO_REPOSITORY')
    private readonly portifolioRepository: Repository<Portifolio>
  ) {}

  async findAll(): Promise<Certificate[]> {
    return this.certificateRepository.find();
  }

 

  async create(createCertificateDto: CreateCertificateDto): Promise<Certificate> {
    const { title, image_name, image, portifolioId} = createCertificateDto
   

    const certificate = new Certificate(); 

    certificate.title = title
    certificate.image_name = image_name;
    certificate.image = image;
    
    const portifolio =  await this.portifolioRepository.findOne({where:{id: portifolioId}});
    certificate.portifolio = portifolio;
    
    const certificateSaved =  await this.certificateRepository.save(certificate)

    return certificateSaved
  }

  async createAll(createCertificateDto: CreateCertificateDto[]): Promise<Certificate[]>{
    const certificates: Certificate[] = [];

    createCertificateDto.forEach(async (createCertificate) => {
      const { title, image_name, image, portifolioId} = createCertificate
   

      const certificate = new Certificate(); 
  
      certificate.title = title
      certificate.image_name = image_name;
      certificate.image = image;
      
      const portifolio =  await this.portifolioRepository.findOne({where:{id: portifolioId}});
      certificate.portifolio = portifolio;
      
      const certificateSaved =  await this.certificateRepository.save(certificate)
  
    
      certificates.push(certificateSaved)
    })
  
    return certificates;
  }

  async findOne(id: number): Promise<Certificate[]>{
    const portifolio = await this.portifolioRepository.findOne({where:  {id: id}});
    const certificate = await this.certificateRepository.find({where: {portifolio: portifolio}});

   return certificate
  }
}