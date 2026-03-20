import { DataSource } from 'typeorm';
import { join } from 'path';

const databaseUrl = process.env.DATABASE_URL;
const isUrl = !!databaseUrl;

// Masked debug log to show which DB host is being used without leaking credentials
if (process.env.NODE_ENV !== 'test') {
  if (isUrl) {
    try {
      const host = databaseUrl?.split('@')?.[1]?.split(':')?.[0] ?? 'unknown';
      console.log(`DATA_SOURCE: detected DATABASE_URL, host=${host}`);
    } catch {
      console.log('DATA_SOURCE: detected DATABASE_URL (host unknown)');
    }
  } else {
    console.log(`DATA_SOURCE: using DB host=${process.env.DB_HOST || 'localhost'} port=${process.env.DB_PORT || 5432}`);
  }
}

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const options: any = {
        type: 'postgres',
        entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
        migrations: [join(__dirname, './migrations/*{.ts,.js}')],
        synchronize: false,
      };

      if (isUrl) {
        options.url = databaseUrl;
        options.ssl = { rejectUnauthorized: false };
        options.extra = { ssl: { rejectUnauthorized: false } };
      } else {
        options.host = process.env.DB_HOST || 'localhost';
        options.port = +(process.env.DB_PORT || 5432);
        options.username = process.env.DB_USER || 'postgres';
        options.password = process.env.DB_PASS || 'psql';
        options.database = process.env.DB_NAME || 'portifolio';
      }

      const dataSource = new DataSource(options);

      // Detailed masked log right before initialize
      try {
        const logHost = isUrl
          ? databaseUrl?.split('@')?.[1]?.split(':')?.[0] ?? 'unknown'
          : options.host;
        console.log(`DATA_SOURCE: initializing (host=${logHost})`);
      } catch {}

      // Retry loop: try to initialize a few times in case the DB is not ready yet
      const maxAttempts = 5;
      const delayMs = 3000;
      let attempt = 0;
      while (attempt < maxAttempts) {
        try {
          attempt++;
          console.log(`DATA_SOURCE: initialize attempt ${attempt}/${maxAttempts}`);
          return await dataSource.initialize();
        } catch (err) {
          console.error(`DATA_SOURCE: initialize attempt ${attempt} failed:`, err?.message || err);
          if (attempt >= maxAttempts) {
            console.error('Failed to initialize DATA_SOURCE provider after retries:', err);
            throw err;
          }
          // wait before retry
          await new Promise((res) => setTimeout(res, delayMs));
        }
      }
    },
  },
];