import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Request } from 'express';
import { createReadStream } from 'fs';
import { S3Service } from './s3.service';
import { GetObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private fileRepository: Repository<File>,
    private s3Service: S3Service
  ) {}
  async saveData(file: Express.Multer.File, req) {
    const arquivo = new File();
    arquivo.fileName = randomUUID() + file.originalname;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    
    // Use the same key as the stored fileName so saved record matches S3 object
    const key = arquivo.fileName;

    const s3Response = await this.s3Service.uploadFile(file.mimetype, key);

    // Use buffer when available (memory storage) or a read stream (disk storage)
    const body = (file as any).buffer ?? createReadStream((file as any).path);

    const sendFileResponse = await fetch(s3Response.uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.mimetype,
        'Content-Length': String(file.size),
      },
      body,
    });

    if (!sendFileResponse.ok) {
      const text = await sendFileResponse.text().catch(() => '');
      console.error('S3 upload failed', sendFileResponse.status, text);
      throw new Error('Failed to upload file to S3');
    }
    const fileUrl = await this.s3Service.generateAccessUrl(key)
    console.log('File uploaded successfully to S3. Accessible URL:', fileUrl);
    arquivo.url = fileUrl;

    console.log(sendFileResponse)
  
    

    return await this.fileRepository.save(arquivo);
  }

  async findById(id: string) {
    return await this.fileRepository.findOne({ where: { id: parseInt(id) } });
  }

  async getS3FileUrl(fileName: string): Promise<string> {
    return this.s3Service.generateAccessUrl(fileName);
  }
}
