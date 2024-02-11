import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { certificateProviders } from './certificate.providers';
import { CertificateService } from './certificate.service';
import { portifolioProviders } from 'src/Portifolio/portifolio.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...certificateProviders,
    ...portifolioProviders,
    CertificateService
  ],
})
export class CertificateModule {}