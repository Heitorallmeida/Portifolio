import 'dotenv/config';
import { AppDataSource } from '../data-source';
import { PortifolioSeeder } from './portifolio.seeder';
import { ExperienceSeeder } from './experience.seeder';
import { HardSkillSeeder } from './hardSkill.seeder';
import { ProjectSeeder } from './project.seeder';
import { AdminSeeder } from './admin.seeder';

async function runSeeders() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Initialize data source
    await AppDataSource.initialize();
    console.log('✅ Data source initialized\n');

    // Run seeders in order
    const portifolioSeeder = new PortifolioSeeder();
    await portifolioSeeder.run(AppDataSource);

    const adminSeeder = new AdminSeeder();
    await adminSeeder.run(AppDataSource);

    const experienceSeeder = new ExperienceSeeder();
    await experienceSeeder.run(AppDataSource);

    const hardSkillSeeder = new HardSkillSeeder();
    await hardSkillSeeder.run(AppDataSource);

    const projectSeeder = new ProjectSeeder();
    await projectSeeder.run(AppDataSource);

    console.log('\n🎉 Database seeding completed successfully!');
    
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(1);
  }
}

runSeeders();
