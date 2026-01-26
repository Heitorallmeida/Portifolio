"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateSeeder = void 0;
const certificate_entity_1 = require("../../Certificate/certificate.entity");
const portifolio_entity_1 = require("../../Portifolio/portifolio.entity");
class CertificateSeeder {
    async run(dataSource) {
        const certificateRepository = dataSource.getRepository(certificate_entity_1.Certificate);
        const portifolioRepository = dataSource.getRepository(portifolio_entity_1.Portifolio);
        const portifolio = await portifolioRepository.findOne({
            where: { id: 1 },
        });
        if (!portifolio) {
            console.log('❌ Portifolio not found. Please seed portifolio first.');
            return;
        }
        const existingCount = await certificateRepository.count();
        if (existingCount === 0) {
            const certificates = [
                {
                    title: 'Node.js Certification',
                    image_name: 'nodejs-cert.png',
                    image: '/uploads/certificates/nodejs-cert.png',
                },
                {
                    title: 'React Advanced Patterns',
                    image_name: 'react-cert.png',
                    image: '/uploads/certificates/react-cert.png',
                },
                {
                    title: 'TypeScript Professional',
                    image_name: 'typescript-cert.png',
                    image: '/uploads/certificates/typescript-cert.png',
                },
            ];
            const certificateEntities = certificates.map((cert) => certificateRepository.create({
                ...cert,
                portifolio: portifolio,
            }));
            await certificateRepository.save(certificateEntities);
            console.log(`✅ ${certificateEntities.length} certificates seeded successfully`);
        }
        else {
            console.log('⏭️  Certificates already exist, skipping...');
        }
    }
}
exports.CertificateSeeder = CertificateSeeder;
//# sourceMappingURL=certificate.seeder.js.map