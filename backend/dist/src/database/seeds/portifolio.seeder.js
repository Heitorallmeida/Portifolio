"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortifolioSeeder = void 0;
const portifolio_entity_1 = require("../../Portifolio/portifolio.entity");
class PortifolioSeeder {
    async run(dataSource) {
        const portifolioRepository = dataSource.getRepository(portifolio_entity_1.Portifolio);
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
        }
        else {
            console.log('⏭️  Portifolio already exists, skipping...');
        }
    }
}
exports.PortifolioSeeder = PortifolioSeeder;
//# sourceMappingURL=portifolio.seeder.js.map