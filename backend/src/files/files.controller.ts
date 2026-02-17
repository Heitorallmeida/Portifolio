//files.controller.ts
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
import multerConfig from './multer-config';
import { Request, Response } from 'express';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    return this.filesService.saveData(file, req);
  }

  @Get('metadata/:id')
  getFileById(@Param('id') id: string) {
    return this.filesService.findById(id);
  }

  @Get(':filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'upload', 'files', filename);
    
    if (!existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      throw new NotFoundException('File not found');
    }
    
    return res.sendFile(filePath);
  }
}
