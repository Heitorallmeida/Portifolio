"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceSeeder = void 0;
const experience_entity_1 = require("../../Experience/experience.entity");
const portifolio_entity_1 = require("../../Portifolio/portifolio.entity");
const experiences_json_1 = __importDefault(require("../../../experiences.json"));
class ExperienceSeeder {
    async run(dataSource) {
        const experienceRepository = dataSource.getRepository(experience_entity_1.Experience);
        const portifolioRepository = dataSource.getRepository(portifolio_entity_1.Portifolio);
        const portifolio = await portifolioRepository.findOne({
            where: { id: 1 },
        });
        if (!portifolio) {
            console.log('❌ Portifolio not found. Please seed portifolio first.');
            return;
        }
        const existingCount = await experienceRepository.count();
        if (existingCount === 0) {
            const experiences = experiences_json_1.default.map((exp) => experienceRepository.create({
                initialDate: new Date(exp.initialDate),
                finishDate: new Date(exp.finishDate),
                current: exp.current,
                image: exp.image,
                title: exp.title,
                portifolio: portifolio,
            }));
            await experienceRepository.save(experiences);
            console.log(`✅ ${experiences.length} experiences seeded successfully`);
        }
        else {
            console.log('⏭️  Experiences already exist, skipping...');
        }
    }
}
exports.ExperienceSeeder = ExperienceSeeder;
//# sourceMappingURL=experience.seeder.js.map