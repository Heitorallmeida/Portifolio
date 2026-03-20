import { AppDataSource } from '../data-source';
import { PortifolioSeeder } from './portifolio.seeder';
import { ExperienceSeeder } from './experience.seeder';
import { HardSkillSeeder } from './hardSkill.seeder';

async function runSeeders() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Initialize data source
    await AppDataSource.initialize();
    console.log('✅ Data source initialized\n');

    // Run seeders in order
    const portifolioSeeder = new PortifolioSeeder();
    await portifolioSeeder.run(AppDataSource);

    const experienceSeeder = new ExperienceSeeder();
    await experienceSeeder.run(AppDataSource);

    const hardSkillSeeder = new HardSkillSeeder();
    await hardSkillSeeder.run(AppDataSource);

    console.log('\n🎉 Database seeding completed successfully!');
    
    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    await AppDataSource.destroy();
    process.exit(1);
  }
}

runSeeders();
