import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { portifolioProviders } from './portifolio.providers';
import { PortifolioService } from './portifolio.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...portifolioProviders,
    PortifolioService
  ],
})
export class PortifolioModule {}