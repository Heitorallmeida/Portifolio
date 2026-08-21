import { Body, Controller, ForbiddenException, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProjectDto } from '../dto/create-project';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() request: any): Promise<Project> {
    if (request.user?.portifolioId !== Number(createProjectDto.portifolioId)) {
      throw new ForbiddenException('You can only add projects to your own portfolio.');
    }
    return this.projectService.create(createProjectDto);
  }
}
