
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { HardSkillService } from './hardSkill.service';
import { HardSkill } from './hardSkill.entity';
import { CreateHardSKillDto } from 'src/dto/create-hard-skill';

@Controller('hardSkill')
export class HardSkillController {
    constructor(private readonly hardSkillService: HardSkillService) {}
  @Get()
  async findAll(): Promise<string> {
     return await this.hardSkillService.findAll().then((p)=>{
        return p
     }).catch((e)=>{
        return e
     });
  }
  @Post()
  async create(@Body() createExperienceDto: CreateHardSKillDto): Promise<HardSkill>{
     return await this.hardSkillService.create(createExperienceDto);
  }

  @Patch()
  async createAll(@Body() createHardSkillsDto: CreateHardSKillDto[]): Promise<HardSkill[]>{
     return await this.hardSkillService.createAll(createHardSkillsDto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: number): Promise<{ [title: string]: number; }> {
    return this.hardSkillService.findOne(id);
  }

}