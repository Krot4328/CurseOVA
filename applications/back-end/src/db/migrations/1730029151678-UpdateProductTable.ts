import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProductTable1730029151678 implements MigrationInterface {
    name = 'UpdateProductTable1730029151678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`CREATE INDEX "IDX_6b71c587b0fd3855fa23b759ca" ON "product" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_41bde09db7136dcee687c2b1f0" ON "product" ("updatedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_0ecd68edfbccce0c85cef5c03a" ON "product" ("deletedAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0ecd68edfbccce0c85cef5c03a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41bde09db7136dcee687c2b1f0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b71c587b0fd3855fa23b759ca"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createdAt"`);
    }

}
