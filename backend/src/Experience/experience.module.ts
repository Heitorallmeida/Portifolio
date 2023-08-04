import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { experienceProviders } from './experience.providers';
import { ExperienceService } from './experience.service';
import { portifolioProviders } from 'src/Portifolio/portifolio.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...experienceProviders,
    ...portifolioProviders,
    ExperienceService
  ],
})
export class ExperienceModule {}