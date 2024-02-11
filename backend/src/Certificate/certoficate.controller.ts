
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { Certificate } from './certificate.entity';
import { CreateCertificateDto } from 'src/dto/create-certificate';

@Controller('certificate')
export class CertificateController {
    constructor(private readonly certificateService: CertificateService) {}
  @Get()
  async findAll(): Promise<string> {
     return await this.certificateService.findAll().then((p)=>{
        return p
     }).catch((e)=>{
        return e
     });
  }
  @Post()
  async create(@Body() createCertificateDto: CreateCertificateDto): Promise<Certificate>{
     return await this.certificateService.create(createCertificateDto);
  }

  @Patch()
  async createAll(@Body() createCertificateDto: CreateCertificateDto[]): Promise<Certificate[]>{
     return await this.certificateService.createAll(createCertificateDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Certificate[]> {
    return this.certificateService.findOne(id);
  }
}