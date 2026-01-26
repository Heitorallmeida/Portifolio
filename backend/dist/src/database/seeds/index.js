"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const portifolio_seeder_1 = require("./portifolio.seeder");
const experience_seeder_1 = require("./experience.seeder");
const hardSkill_seeder_1 = require("./hardSkill.seeder");
const certificate_seeder_1 = require("./certificate.seeder");
async function runSeeders() {
    try {
        console.log('🌱 Starting database seeding...\n');
        await data_source_1.AppDataSource.initialize();
        console.log('✅ Data source initialized\n');
        const portifolioSeeder = new portifolio_seeder_1.PortifolioSeeder();
        await portifolioSeeder.run(data_source_1.AppDataSource);
        const experienceSeeder = new experience_seeder_1.ExperienceSeeder();
        await experienceSeeder.run(data_source_1.AppDataSource);
        const hardSkillSeeder = new hardSkill_seeder_1.HardSkillSeeder();
        await hardSkillSeeder.run(data_source_1.AppDataSource);
        const certificateSeeder = new certificate_seeder_1.CertificateSeeder();
        await certificateSeeder.run(data_source_1.AppDataSource);
        console.log('\n🎉 Database seeding completed successfully!');
        await data_source_1.AppDataSource.destroy();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        await data_source_1.AppDataSource.destroy();
        process.exit(1);
    }
}
runSeeders();
//# sourceMappingURL=index.js.map