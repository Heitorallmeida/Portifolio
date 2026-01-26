"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardSkillSeeder = void 0;
const hardSkill_entity_1 = require("../../HardSkill/hardSkill.entity");
const portifolio_entity_1 = require("../../Portifolio/portifolio.entity");
const hardSkills_json_1 = __importDefault(require("../../../hardSkills.json"));
class HardSkillSeeder {
    async run(dataSource) {
        const hardSkillRepository = dataSource.getRepository(hardSkill_entity_1.HardSkill);
        const portifolioRepository = dataSource.getRepository(portifolio_entity_1.Portifolio);
        const portifolio = await portifolioRepository.findOne({
            where: { id: 1 },
        });
        if (!portifolio) {
            console.log('❌ Portifolio not found. Please seed portifolio first.');
            return;
        }
        const existingCount = await hardSkillRepository.count();
        if (existingCount === 0) {
            const hardSkills = hardSkills_json_1.default.map((skill) => hardSkillRepository.create({
                initialDate: new Date(skill.initialDate),
                finishDate: new Date(skill.finishDate),
                current: skill.current,
                percentage: this.calculatePercentage(new Date(skill.initialDate), new Date(skill.finishDate), skill.current),
                title: skill.title,
                portifolio: portifolio,
            }));
            await hardSkillRepository.save(hardSkills);
            console.log(`✅ ${hardSkills.length} hard skills seeded successfully`);
        }
        else {
            console.log('⏭️  Hard skills already exist, skipping...');
        }
    }
    calculatePercentage(initialDate, finishDate, current) {
        const endDate = current ? new Date() : finishDate;
        const monthsOfExperience = (endDate.getTime() - initialDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
        const percentage = Math.min((monthsOfExperience / 60) * 100, 100);
        return Math.round(percentage * 10) / 10;
    }
}
exports.HardSkillSeeder = HardSkillSeeder;
//# sourceMappingURL=hardSkill.seeder.js.map