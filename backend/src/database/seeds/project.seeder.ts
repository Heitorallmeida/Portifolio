import { DataSource } from 'typeorm';
import { Portifolio } from '../../Portifolio/portifolio.entity';
import { Project } from '../../Project/project.entity';
import projectsData from '../../../projects.json';

export class ProjectSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const projectRepository = dataSource.getRepository(Project);
    const portifolioRepository = dataSource.getRepository(Portifolio);
    const portifolio = await portifolioRepository.findOne({ where: { id: 1 } });

    if (!portifolio) {
      console.log('❌ Portifolio not found. Please seed portifolio first.');
      return;
    }

    const projects = (projectsData as any[]).map((project) =>
      projectRepository.create({
        title: project.title,
        description: project.description,
        image: project.image || null,
        repositoryUrl: project.repositoryUrl || null,
        liveUrl: project.liveUrl || null,
        technologies: project.technologies || [],
        initialDate: new Date(project.initialDate),
        finishDate: project.finishDate ? new Date(project.finishDate) : null,
        current: project.current,
        featured: project.featured,
        portifolio,
      }),
    );

    await dataSource.transaction(async (manager) => {
      // Always replace the complete collection. This makes the seed idempotent:
      // after any number of runs, this portfolio has exactly the JSON entries.
      await manager
        .createQueryBuilder()
        .delete()
        .from(Project)
        .where('"portifolioId" = :portifolioId', { portifolioId: portifolio.id })
        .execute();

      await manager.save(Project, projects);
    });

    const total = await projectRepository.count({
      where: { portifolio: { id: portifolio.id } },
    });

    if (total !== projects.length) {
      throw new Error(`Project seed verification failed: expected ${projects.length}, found ${total}`);
    }

    console.log(`✅ ${total} projects synchronized successfully`);
  }
}
