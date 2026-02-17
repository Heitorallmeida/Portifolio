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
import { FilesModule } from './files/files.module';
import { FilesController } from './files/files.controller';
import { fileProviders } from './files/entities/file.providers';
import { FilesService } from './files/files.service';
import { CertificateModule } from './Certificate/certificate.module';
import { CertificateController } from './Certificate/certoficate.controller';
import { certificateProviders } from './Certificate/certificate.providers';
import { CertificateService } from './Certificate/certificate.service';

@Module({
  imports: [PortifolioModule, ExperienceModule, HardSkillModule, FilesModule, CertificateModule],
  controllers: [AppController, PortifolioController, ExperienceController, HardSkillController, CertificateController, FilesController],
  providers: [...portifolioProviders, ...fileProviders, ...experienceProviders, ...databaseProviders, ...hardSkillProviders, ...certificateProviders, AppService, PortifolioService, ExperienceService, HardSkillService, FilesService, CertificateService],
})
export class AppModule {}
