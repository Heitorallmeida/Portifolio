import { DataSource } from 'typeorm';
import { Certificate } from '../../Certificate/certificate.entity';
import { Portifolio } from '../../Portifolio/portifolio.entity';

export class CertificateSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const certificateRepository = dataSource.getRepository(Certificate);
    const portifolioRepository = dataSource.getRepository(Portifolio);

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

      const certificateEntities = certificates.map((cert) =>
        certificateRepository.create({
          ...cert,
          portifolio: portifolio,
        })
      );

      await certificateRepository.save(certificateEntities);
      console.log(`✅ ${certificateEntities.length} certificates seeded successfully`);
    } else {
      console.log('⏭️  Certificates already exist, skipping...');
    }
  }
}
