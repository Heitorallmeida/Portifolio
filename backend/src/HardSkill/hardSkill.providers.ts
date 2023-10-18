import { DataSource } from 'typeorm';
import { HardSkill } from './hardSkill.entity';

export const hardSkillProviders = [
  {
    provide: 'HARD_SKILL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(HardSkill),
    inject: ['DATA_SOURCE'],
  },
];