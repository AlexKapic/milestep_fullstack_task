import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserCinfirmedAt1639661825216 implements MigrationInterface {
    name = 'updateUserCinfirmedAt1639661825216';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "confirmedAt" DROP NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "confirmedAt" SET NOT NULL');
    }

}
