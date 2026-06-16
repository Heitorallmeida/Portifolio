import { MigrationInterface, QueryRunner } from "typeorm";

export class UseProfileImageUrl1769388649060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "portifolio" ADD COLUMN "profileImageUrl" text`);
    await queryRunner.query(`
      UPDATE "portifolio" p
      SET "profileImageUrl" = f."url"
      FROM "file" f
      WHERE p."profileImageId" = f."id"
    `);
    await queryRunner.query(`ALTER TABLE "portifolio" DROP CONSTRAINT "FK_portifolio_file"`);
    await queryRunner.query(`ALTER TABLE "portifolio" DROP COLUMN "profileImageId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "portifolio" ADD COLUMN "profileImageId" integer`);
    await queryRunner.query(`
      ALTER TABLE "portifolio"
      ADD CONSTRAINT "FK_portifolio_file"
      FOREIGN KEY ("profileImageId") REFERENCES "file"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
    await queryRunner.query(`ALTER TABLE "portifolio" DROP COLUMN "profileImageUrl"`);
  }
}
