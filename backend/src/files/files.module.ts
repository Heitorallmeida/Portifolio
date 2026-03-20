import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { fileProviders } from './entities/file.providers';
import { S3Service } from './s3.service';

@Module({
  imports: [DatabaseModule],
  providers: [...fileProviders,S3Service],
  exports: [S3Service]
})
export class FilesModule {}
