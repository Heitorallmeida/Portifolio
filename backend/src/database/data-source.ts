import { DataSource } from 'typeorm';
import { join } from 'path';

const databaseUrl = process.env.DATABASE_URL;
const isUrl = !!databaseUrl;

// Helpful debug info when running in production (will not print the full URL)
if (isUrl && process.env.NODE_ENV !== 'test') {
  console.log('DB: using DATABASE_URL, host=', databaseUrl?.split('@')?.[1]?.split(':')?.[0]);
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...(isUrl
    ? { url: databaseUrl }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: +(process.env.DB_PORT || 5432),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'psql',
        database: process.env.DB_NAME || 'portifolio',
      }),
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/*{.ts,.js}')],
  synchronize: false,
  ...(isUrl
    ? ({
        ssl: { rejectUnauthorized: false } as any,
        extra: { ssl: { rejectUnauthorized: false } },
      } as Partial<typeof DataSource>)
    : {}),
});
