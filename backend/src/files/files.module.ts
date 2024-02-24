import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { fileProviders } from './entities/file.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...fileProviders],
})
export class FilesModule {}
