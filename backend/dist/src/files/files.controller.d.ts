/// <reference types="multer" />
import { FilesService } from './files.service';
import { Request } from 'express';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File, req: Request): Promise<import("./entities/file.entity").File>;
}
