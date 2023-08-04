import { DataSource } from 'typeorm';
import { Experience } from './experience.entity';

export const experienceProviders = [
  {
    provide: 'EXPERIENCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Experience),
    inject: ['DATA_SOURCE'],
  },
];