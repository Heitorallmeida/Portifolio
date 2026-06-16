import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1719242687000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create user table
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_user_email" UNIQUE ("email"),
                CONSTRAINT "PK_user" PRIMARY KEY ("id")
            )
        `);

        // Add foreign key constraint from portifolio to user
        await queryRunner.query(`
            ALTER TABLE "portifolio" 
            ADD COLUMN "userId" integer
        `);

        await queryRunner.query(`
            ALTER TABLE "portifolio" 
            ADD CONSTRAINT "FK_portifolio_user" 
            FOREIGN KEY ("userId") REFERENCES "user"("id") 
            ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint
        await queryRunner.query(`ALTER TABLE "portifolio" DROP CONSTRAINT "FK_portifolio_user"`);

        // Remove userId column from portifolio
        await queryRunner.query(`ALTER TABLE "portifolio" DROP COLUMN "userId"`);

        // Drop user table
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
