import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Request } from 'express';

@Injectable()
export class FilesService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private fileRepository: Repository<File>,
  ) {}
  async saveData(file: Express.Multer.File, req: Request) {
    const arquivo = new File();
    arquivo.fileName = file.filename;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.url = `${req.protocol}://${req.get('host')}/files/${file.filename}`;

    return await this.fileRepository.save(arquivo);
  }
}
