import { MigrationInterface, QueryRunner } from "typeorm"

export class AddAboutMeToPortifolio1769388649040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "portifolio"
            ADD COLUMN "aboutMe" text
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "portifolio"
            DROP COLUMN "aboutMe"
        `);
    }

}
