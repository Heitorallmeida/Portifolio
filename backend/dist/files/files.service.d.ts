/// <reference types="multer" />
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Request } from 'express';
export declare class FilesService {
    private fileRepository;
    constructor(fileRepository: Repository<File>);
    saveData(file: Express.Multer.File, req: Request): Promise<File>;
}
