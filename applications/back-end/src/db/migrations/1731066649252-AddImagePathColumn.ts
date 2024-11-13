import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagePathColumn1731066649252 implements MigrationInterface {
    name = 'AddImagePathColumn1731066649252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "pathToImage" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "pathToImage"`);
    }

}
