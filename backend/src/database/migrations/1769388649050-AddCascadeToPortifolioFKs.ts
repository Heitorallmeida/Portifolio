import { MigrationInterface, QueryRunner } from "typeorm"

export class AddCascadeToPortifolioFKs1769388649050 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_experience_portifolio"`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_experience_portifolio" FOREIGN KEY ("portifolioId") REFERENCES "portifolio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "hard_skill" DROP CONSTRAINT "FK_hard_skill_portifolio"`);
        await queryRunner.query(`ALTER TABLE "hard_skill" ADD CONSTRAINT "FK_hard_skill_portifolio" FOREIGN KEY ("portifolioId") REFERENCES "portifolio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "certificate" DROP CONSTRAINT "FK_certificate_portifolio"`);
        await queryRunner.query(`ALTER TABLE "certificate" ADD CONSTRAINT "FK_certificate_portifolio" FOREIGN KEY ("portifolioId") REFERENCES "portifolio"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certificate" DROP CONSTRAINT "FK_certificate_portifolio"`);
        await queryRunner.query(`ALTER TABLE "certificate" ADD CONSTRAINT "FK_certificate_portifolio" FOREIGN KEY ("portifolioId") REFERENCES "portifolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "hard_skill" DROP CONSTRAINT "FK_hard_skill_portifolio"`);
        await queryRunner.query(`ALTER TABLE "hard_skill" ADD CONSTRAINT "FK_hard_skill_portifolio" FOREIGN KEY ("portifolioId") REFERENCES "portifolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_experience_portifolio"`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_experience_portifolio" FOREIGN KEY ("portifolioId") REFERENCES "portifolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
