import { DataSource } from 'typeorm';
import { Portifolio } from './portifolio.entity';

export const portifolioProviders = [
  {
    provide: 'PORTIFOLIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Portifolio),
    inject: ['DATA_SOURCE'],
  },
];