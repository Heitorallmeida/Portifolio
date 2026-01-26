import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'psql',
        database: 'portifolio',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];