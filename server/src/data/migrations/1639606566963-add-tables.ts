import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTables1639606566963 implements MigrationInterface {
    name = 'addTables1639606566963';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying(200) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(200) NOT NULL, "confirmedAt" TIMESTAMP NOT NULL, CONSTRAINT "unique_user_email_constraint" UNIQUE ("email"), CONSTRAINT "unique_user_username_constraint" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "authorId" uuid NOT NULL, "title" character varying(100) NOT NULL, "description" character varying NOT NULL, "isDone" boolean NOT NULL, "priority" integer NOT NULL, "dueDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "task" ADD CONSTRAINT "FK_30cb9d78297c1f2a2e07df1a616" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "task" DROP CONSTRAINT "FK_30cb9d78297c1f2a2e07df1a616"');
        await queryRunner.query('DROP TABLE "task"');
        await queryRunner.query('DROP TABLE "user"');
    }

}
