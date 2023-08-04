
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from 'src/dto/create-experience';
import { Experience } from './experience.entity';

@Controller('experience')
export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService) {}
  @Get()
  async findAll(): Promise<string> {
     return await this.experienceService.findAll().then((p)=>{
        return p
     }).catch((e)=>{
        return e
     });
  }
  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto): Promise<Experience>{
     return await this.experienceService.create(createExperienceDto.title, createExperienceDto.initialDate, 
      createExperienceDto.finishDate, createExperienceDto.current, createExperienceDto.portifolioId, 
      createExperienceDto.image);
  }
  
  @Post('experiences')
  async createAll(@Body() createExperiencesDto: CreateExperienceDto[]): Promise<Experience[]>{
     return await this.experienceService.createAll(createExperiencesDto);
  }
}