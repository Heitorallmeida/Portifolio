import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToPortifolio1787068800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "portifolio" ADD COLUMN "role" text');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "portifolio" DROP COLUMN "role"');
  }
}
