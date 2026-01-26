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

    const existingCount = await experienceRepository.count();

    if (existingCount === 0) {
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

      await experienceRepository.save(experiences);
      console.log(`✅ ${experiences.length} experiences seeded successfully`);
    } else {
      console.log('⏭️  Experiences already exist, skipping...');
    }
  }
}
