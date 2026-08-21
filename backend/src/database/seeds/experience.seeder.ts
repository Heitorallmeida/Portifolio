import { DataSource } from 'typeorm';
import { Experience } from '../../Experience/experience.entity';
import { Portifolio } from '../../Portifolio/portifolio.entity';
import experiencesData from '../../../experiences.json';

export class ExperienceSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const experienceRepository = dataSource.getRepository(Experience);
    const portifolioRepository = dataSource.getRepository(Portifolio);

    const portifolio = await portifolioRepository.findOne({
      where: { id: 1 },
    });

    if (!portifolio) {
      console.log('❌ Portifolio not found. Please seed portifolio first.');
      return;
    }

    const experiences = (experiencesData as any[]).map((exp: any) =>
      experienceRepository.create({
        initialDate: new Date(exp.initialDate),
        finishDate: new Date(exp.finishDate),
        current: exp.current,
        image: exp.image,
        title: exp.title,
        portifolio: portifolio,
      })
    );

    await dataSource.transaction(async (manager) => {
      // Always replace the complete collection. This makes the seed idempotent:
      // after any number of runs, this portfolio has exactly the JSON entries.
      await manager
        .createQueryBuilder()
        .delete()
        .from(Experience)
        .where('"portifolioId" = :portifolioId', { portifolioId: portifolio.id })
        .execute();

      await manager.save(Experience, experiences);
    });

    const total = await experienceRepository.count({
      where: { portifolio: { id: portifolio.id } },
    });

    if (total !== experiences.length) {
      throw new Error(`Experience seed verification failed: expected ${experiences.length}, found ${total}`);
    }

    console.log(`✅ ${total} experiences synchronized successfully`);
  }
}
