import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { hardSkillProviders } from './hardSkill.providers';
import { HardSkillService } from './hardSkill.service';
import { portifolioProviders } from 'src/Portifolio/portifolio.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...hardSkillProviders,
    ...portifolioProviders,
    HardSkillService
  ],
})
export class HardSkillModule {}