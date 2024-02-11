import { DataSource } from 'typeorm';
import { Certificate } from './certificate.entity';

export const certificateProviders = [
  {
    provide: 'CERTIFICATE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Certificate),
    inject: ['DATA_SOURCE'],
  },
];