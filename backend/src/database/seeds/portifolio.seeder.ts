import { DataSource } from 'typeorm';
import { Portifolio } from '../../Portifolio/portifolio.entity';

export class PortifolioSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const portifolioRepository = dataSource.getRepository(Portifolio);

    const existingPortifolio = await portifolioRepository.findOne({
      where: { id: 1 },
    });

    const profileImageUrl = 'https://media.licdn.com/dms/image/v2/D4D03AQH30hTNv1sFQw/profile-displayphoto-crop_800_800/B4DZzKaWMXJoAI-/0/1772922435644?e=1788393600&v=beta&t=qbnsIWshiVbGDqfyNUUVoVnaD7k6-HC_xvE4ccfaIew';
    const role = 'Senior Software Engineer';
    const aboutMe = 'Software Engineer with over 6 years of experience building scalable web applications. I work with React, Next.js, and TypeScript on the frontend, as well as NestJS, Spring Boot, and Ruby on Rails on the backend. I enjoy turning complex problems into simple, high-performing, and reliable experiences.';

    if (!existingPortifolio) {
      const portifolio = portifolioRepository.create({
        id: 1,
        name: 'Heitor',
        lastname: 'Almeida',
        profileImageUrl,
        role,
        aboutMe,
      });

      await portifolioRepository.save(portifolio);
      console.log('✅ Portifolio seeded successfully');
    } else {
      existingPortifolio.name = 'Heitor';
      existingPortifolio.lastname = 'Almeida';
      existingPortifolio.profileImageUrl = profileImageUrl;
      existingPortifolio.role = role;
      existingPortifolio.aboutMe = aboutMe;
      await portifolioRepository.save(existingPortifolio);
      console.log('✅ Portifolio image updated successfully');
    }
  }
}
