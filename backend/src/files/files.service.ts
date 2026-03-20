import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Request } from 'express';
import { createReadStream } from 'fs';
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
   
      // Use PUT for S3 presigned uploads and send buffer or stream.
      const body = (file.buffer ? file.buffer : createReadStream(file.path)) as any;

      const response = await fetch(resp.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.mimetype },
        body,
      });
    
    if (!response.ok) {
      throw new Error(`S3 upload failed with status ${response.status}`);
    }
    
    // Extract the object URL by removing query parameters from the presigned URL
    const fileUrl = resp.uploadUrl.split('?')[0];
    arquivo.url = fileUrl;
    console.log('File uploaded to S3:', fileUrl)

    return await this.fileRepository.save(arquivo);
  }

  async findById(id: string) {
    return await this.fileRepository.findOne({ where: { id: parseInt(id) } });
  }
}
