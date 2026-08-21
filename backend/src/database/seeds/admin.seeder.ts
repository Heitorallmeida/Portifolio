import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Portifolio } from '../../Portifolio/portifolio.entity';
import { User } from '../../users/users.entity';

export class AdminSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const email = process.env.ADMIN_EMAIL?.trim();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set before running the seeds.');
    }

    const userRepository = dataSource.getRepository(User);
    const portifolioRepository = dataSource.getRepository(Portifolio);
    const portifolio = await portifolioRepository.findOne({ where: { id: 1 } });

    if (!portifolio) {
      throw new Error('Portifolio with ID 1 must exist before seeding the admin user.');
    }

    let admin = await userRepository.findOne({ where: { email } });
    let passwordUpdated = false;

    if (!admin) {
      admin = userRepository.create({
        email,
        password: await bcrypt.hash(password, 10),
      });
      admin = await userRepository.save(admin);
    } else if (!(await bcrypt.compare(password, admin.password))) {
      admin.password = await bcrypt.hash(password, 10);
      admin = await userRepository.save(admin);
      passwordUpdated = true;
    }

    portifolio.user = admin;
    await portifolioRepository.save(portifolio);

    console.log(`✅ Admin user ${passwordUpdated ? 'password updated and ' : ''}linked to portifolio ID 1`);
  }
}
