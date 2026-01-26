import { DataSource } from 'typeorm';
import { HardSkill } from '../../HardSkill/hardSkill.entity';
import { Portifolio } from '../../Portifolio/portifolio.entity';
import hardSkillsData from '../../../hardSkills.json';

export class HardSkillSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const hardSkillRepository = dataSource.getRepository(HardSkill);
    const portifolioRepository = dataSource.getRepository(Portifolio);

    const portifolio = await portifolioRepository.findOne({
      where: { id: 1 },
    });

    if (!portifolio) {
      console.log('❌ Portifolio not found. Please seed portifolio first.');
      return;
    }

    const existingCount = await hardSkillRepository.count();

    if (existingCount === 0) {
      const hardSkills = (hardSkillsData as any[]).map((skill: any) =>
        hardSkillRepository.create({
          initialDate: new Date(skill.initialDate),
          finishDate: new Date(skill.finishDate),
          current: skill.current,
          percentage: this.calculatePercentage(
            new Date(skill.initialDate),
            new Date(skill.finishDate),
            skill.current
          ),
          title: skill.title,
          portifolio: portifolio,
        })
      );

      await hardSkillRepository.save(hardSkills);
      console.log(`✅ ${hardSkills.length} hard skills seeded successfully`);
    } else {
      console.log('⏭️  Hard skills already exist, skipping...');
    }
  }

  private calculatePercentage(
    initialDate: Date,
    finishDate: Date,
    current: boolean
  ): number {
    const endDate = current ? new Date() : finishDate;
    const monthsOfExperience =
      (endDate.getTime() - initialDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    // Calculate percentage based on months of experience
    // Max 100% for 5+ years (60+ months)
    const percentage = Math.min((monthsOfExperience / 60) * 100, 100);
    return Math.round(percentage * 10) / 10; // Round to 1 decimal place
  }
}
