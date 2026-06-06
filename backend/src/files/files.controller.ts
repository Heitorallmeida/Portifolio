import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Request, Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.filesService.saveData(file, req);
  }

  @Get('metadata/:id')
  getFileById(@Param('id') id: string) {
    return this.filesService.findById(id);
  }

  @Get(':filename')
  async serveFile(@Param('filename') filename: string) {
    return this.filesService.getS3FileUrl(filename);
  }
}
