import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectTable1787068900000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "project" (
        "id" SERIAL NOT NULL,
        "title" character varying NOT NULL,
        "description" text NOT NULL,
        "image" text,
        "repositoryUrl" text,
        "liveUrl" text,
        "technologies" text array NOT NULL DEFAULT '{}',
        "initialDate" TIMESTAMP NOT NULL,
        "finishDate" TIMESTAMP,
        "current" boolean NOT NULL DEFAULT false,
        "featured" boolean NOT NULL DEFAULT false,
        "portifolioId" integer,
        CONSTRAINT "PK_project" PRIMARY KEY ("id"),
        CONSTRAINT "FK_project_portifolio" FOREIGN KEY ("portifolioId") REFERENCES "portifolio"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "project"');
  }
}
