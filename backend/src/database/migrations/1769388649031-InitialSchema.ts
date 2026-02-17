import { MigrationInterface, QueryRunner } from "typeorm"

export class InitialSchema1769388649031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create file table first (since portifolio references it)
        await queryRunner.query(`
            CREATE TABLE "file" (
                "id" SERIAL NOT NULL,
                "fileName" character varying NOT NULL,
                "contentLength" integer NOT NULL,
                "contentType" character varying NOT NULL,
                "url" character varying NOT NULL,
                CONSTRAINT "UQ_file_fileName" UNIQUE ("fileName"),
                CONSTRAINT "PK_file" PRIMARY KEY ("id")
            )
        `);

        // Create portifolio table
        await queryRunner.query(`
            CREATE TABLE "portifolio" (
                "id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "lastname" character varying NOT NULL,
                "profileImageId" integer,
                CONSTRAINT "PK_portifolio" PRIMARY KEY ("id")
            )
        `);

        // Create experience table
        await queryRunner.query(`
            CREATE TABLE "experience" (
                "id" SERIAL NOT NULL,
                "initialDate" TIMESTAMP NOT NULL,
                "finishDate" TIMESTAMP NOT NULL,
                "current" boolean NOT NULL,
                "image" character varying NOT NULL,
                "title" character varying NOT NULL,
                "portifolioId" integer,
                CONSTRAINT "PK_experience" PRIMARY KEY ("id")
            )
        `);

        // Create hard_skill table
        await queryRunner.query(`
            CREATE TABLE "hard_skill" (
                "id" SERIAL NOT NULL,
                "initialDate" TIMESTAMP NOT NULL,
                "finishDate" TIMESTAMP NOT NULL,
                "current" boolean NOT NULL,
                "percentage" real NOT NULL,
                "title" character varying NOT NULL,
                "portifolioId" integer,
                CONSTRAINT "PK_hard_skill" PRIMARY KEY ("id")
            )
        `);

        // Create certificate table
        await queryRunner.query(`
            CREATE TABLE "certificate" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "image_name" character varying NOT NULL,
                "image" character varying NOT NULL,
                "portifolioId" integer,
                CONSTRAINT "PK_certificate" PRIMARY KEY ("id")
            )
        `);

        // Add foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "portifolio" 
            ADD CONSTRAINT "FK_portifolio_file" 
            FOREIGN KEY ("profileImageId") REFERENCES "file"("id") 
            ON DELETE SET NULL ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "experience" 
            ADD CONSTRAINT "FK_experience_portifolio" 
            FOREIGN KEY ("portifolioId") REFERENCES "portifolio"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "hard_skill" 
            ADD CONSTRAINT "FK_hard_skill_portifolio" 
            FOREIGN KEY ("portifolioId") REFERENCES "portifolio"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            ALTER TABLE "certificate" 
            ADD CONSTRAINT "FK_certificate_portifolio" 
            FOREIGN KEY ("portifolioId") REFERENCES "portifolio"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE "certificate" DROP CONSTRAINT "FK_certificate_portifolio"`);
        await queryRunner.query(`ALTER TABLE "hard_skill" DROP CONSTRAINT "FK_hard_skill_portifolio"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_experience_portifolio"`);
        await queryRunner.query(`ALTER TABLE "portifolio" DROP CONSTRAINT "FK_portifolio_file"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE "certificate"`);
        await queryRunner.query(`DROP TABLE "hard_skill"`);
        await queryRunner.query(`DROP TABLE "experience"`);
        await queryRunner.query(`DROP TABLE "portifolio"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}
