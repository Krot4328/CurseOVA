import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFileTable1731709610814 implements MigrationInterface {
    name = 'UpdateFileTable1731709610814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" ADD "src" text NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_a30bbe26f7d46dc5ff213ab32b" ON "file" ("src") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a30bbe26f7d46dc5ff213ab32b"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "src"`);
    }

}
