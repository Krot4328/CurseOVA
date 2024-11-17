import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTackleColumn1731066224873 implements MigrationInterface {
    name = 'AddTackleColumn1731066224873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_tackle_enum" AS ENUM('Rod', 'Reel', 'Line', 'Hook', 'Sinkers', 'Floats', 'Lures', 'Bait', 'Swivels', 'Leaders', 'Nets', 'Traps', 'TackleBox')`);
        await queryRunner.query(`ALTER TABLE "product" ADD "tackle" "public"."product_tackle_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "tackle"`);
        await queryRunner.query(`DROP TYPE "public"."product_tackle_enum"`);
    }

}
