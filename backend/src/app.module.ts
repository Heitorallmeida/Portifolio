import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import awsConfig from './config/aws.config';
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
// import { FilesModule } from './files/files.module';
// import { FilesController } from './files/files.controller';
// import { fileProviders } from './files/entities/file.providers';
// import { FilesService } from './files/files.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { usersProviders } from './users/users.providers';
import { ProjectController } from './Project/project.controller';
import { ProjectModule } from './Project/project.module';
import { projectProviders } from './Project/project.providers';
import { ProjectService } from './Project/project.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PortifolioModule,
    ExperienceModule,
    HardSkillModule,
    // File uploads and the S3 bucket are intentionally disabled for security.
    // Keep the files module source for a future, reviewed implementation.
    // FilesModule,
    AuthModule,
    UsersModule,
    ProjectModule,
  ],
  controllers: [AppController, PortifolioController, ExperienceController, HardSkillController, ProjectController],
  providers: [...portifolioProviders, ...experienceProviders, ...databaseProviders, ...hardSkillProviders, ...projectProviders, ...usersProviders, AppService, PortifolioService, ExperienceService, HardSkillService, ProjectService],
})
export class AppModule { }
