import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortifolioController } from './Portifolio/portifolio.controller';
import { PortifolioModule } from './Portifolio/portifolio.module';
import { PortifolioService } from './Portifolio/portifolio.service';
import { portifolioProviders } from './Portifolio/portifolio.providers';
import { databaseProviders } from './database/database.providers';
import { ExperienceController } from './Experience/experience.controller';
import { ExperienceModule } from './Experience/experience.module';
import { experienceProviders } from './Experience/experience.providers';
import { ExperienceService } from './Experience/experience.service';
import { HardSkillController } from './HardSkill/hardSkill.controller';
import { HardSkillModule } from './HardSkill/hardSkill.module';
import { HardSkillService } from './HardSkill/hardSkill.service';
import { hardSkillProviders } from './HardSkill/hardSkill.providers';

@Module({
  imports: [PortifolioModule, ExperienceModule, HardSkillModule],
  controllers: [AppController, PortifolioController, ExperienceController, HardSkillController],
  providers: [...portifolioProviders, ...experienceProviders, ...databaseProviders, ...hardSkillProviders,AppService, PortifolioService, ExperienceService, HardSkillService],
})
export class AppModule {}
