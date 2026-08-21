import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { portifolioProviders } from '../Portifolio/portifolio.providers';
import { projectProviders } from './project.providers';
import { ProjectService } from './project.service';

@Module({
  imports: [DatabaseModule],
  providers: [...projectProviders, ...portifolioProviders, ProjectService],
})
export class ProjectModule {}
