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

    const existingProjects = await projectRepository.find({
      where: { portifolio: { id: portifolio.id } },
    });

    if (existingProjects.length > 0) {
      await projectRepository.remove(existingProjects);
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

    await projectRepository.save(projects);
    console.log(`✅ ${projects.length} projects synchronized successfully`);
  }
}
