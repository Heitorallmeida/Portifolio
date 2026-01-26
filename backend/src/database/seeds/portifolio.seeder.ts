import { DataSource } from 'typeorm';
import { Portifolio } from '../../Portifolio/portifolio.entity';

export class PortifolioSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const portifolioRepository = dataSource.getRepository(Portifolio);

    const existingPortifolio = await portifolioRepository.findOne({
      where: { id: 1 },
    });

    if (!existingPortifolio) {
      const portifolio = portifolioRepository.create({
        id: 1,
        name: 'Heitor',
        lastname: 'Silva',
      });

      await portifolioRepository.save(portifolio);
      console.log('✅ Portifolio seeded successfully');
    } else {
      console.log('⏭️  Portifolio already exists, skipping...');
    }
  }
}
