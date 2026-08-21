import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLoginSecurityToUser1787069000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" ADD COLUMN "failedLoginAttempts" integer NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE "user" ADD COLUMN "isLocked" boolean NOT NULL DEFAULT false');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "isLocked"');
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "failedLoginAttempts"');
  }
}
