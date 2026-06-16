
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PortifolioService } from './portifolio.service';
import { CreatePortifolioDto } from 'src/dto/create-portifolio';
import { Portifolio } from './portifolio.entity';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm';
import { Public } from 'src/auth/auth.constants';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('portifolio')
export class PortifolioController {
   constructor(private readonly portifolioService: PortifolioService) { }

   @Public()
   @Get()
   async findAll(): Promise<string> {
      return await this.portifolioService.findAll().then((p) => {

         return p
      }).catch((e) => {
         return e
      });
   }

   @Get(':id')
   async findOne(@Param() params: any): Promise<string> {
      return await this.portifolioService.findById(params.id).then((p) => {
         return p
      }).catch((e) => {
         return e
      });
   }

   @UseGuards(AuthGuard)
   @Post()
   async create(@Body() createPortifolioDto: CreatePortifolioDto): Promise<Portifolio> {
      return await this.portifolioService.create(createPortifolioDto.name, createPortifolioDto.lastname, createPortifolioDto.profileImageUrl, createPortifolioDto.aboutMe);
   }

   @Put(':id')
   async update(@Param('id') id: number, @Body() createPortifolioDto: CreatePortifolioDto): Promise<UpdateResult> {
      return await this.portifolioService.update(id, createPortifolioDto.name, createPortifolioDto.lastname, createPortifolioDto.profileImageUrl, createPortifolioDto.aboutMe);
   }
   @Delete(':id')
   async delete(@Param('id') id: number): Promise<DeleteResult> {
      return await this.portifolioService.delete(id);
   }

}
