import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Allow requests from any origin by default (adjust for production as needed)
  app.enableCors();

  // Serve static files from upload directory
  app.useStaticAssets(join(__dirname, '..', 'upload'), {
    prefix: '/files/',
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  await app.listen(port);
  console.log(`Nest application listening on port ${port}`);
}
bootstrap();
