import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Request } from 'express';
import { S3Service } from './s3.service';
import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private fileRepository: Repository<File>,
    private s3Service: S3Service
  ) {}
  async saveData(file: Express.Multer.File, req) {
    const arquivo = new File();
    arquivo.fileName = file.originalname + randomUUID();
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    
    const resp = await this.s3Service.uploadFile(file.mimetype);
   
    const response = await fetch(resp.uploadUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': file.mimetype },
      body: file as any,
    });
    
    const responseData = await response;
    
    arquivo.url = await responseData.url;

    return await this.fileRepository.save(arquivo);
  }

  async findById(id: string) {
    return await this.fileRepository.findOne({ where: { id: parseInt(id) } });
  }
}
