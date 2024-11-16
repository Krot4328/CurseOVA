import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCartTables1731758031394 implements MigrationInterface {
    name = 'AddCartTables1731758031394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userGid" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e07a38ee6884236ea066d8de3b" ON "cart" ("userGid") `);
        await queryRunner.query(`CREATE INDEX "IDX_8af054e0d37fd0cf08bd97ec77" ON "cart" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_2730c0c8bc7092e4c4154edc53" ON "cart" ("updatedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_c5def9a7d1f13dcaebfed62c9b" ON "cart" ("deletedAt") `);
        await queryRunner.query(`CREATE TABLE "cart_to_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cartId" uuid NOT NULL, "productId" uuid NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_22ce51f7c148808a09239fef426" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c67493500b5665c42f1b7c2c93" ON "cart_to_product" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_38a2bd98461c020d44b829d739" ON "cart_to_product" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a37d5945417d7ec9feb8ebd519" ON "cart_to_product" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_05079487da1386ac776b4069f6" ON "cart_to_product" ("updatedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a1887d3a3e63bebbdccbf33be" ON "cart_to_product" ("deletedAt") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_bf0747b86dba09fa338c9fb251" ON "cart_to_product" ("cartId", "productId") `);
        await queryRunner.query(`ALTER TABLE "cart_to_product" ADD CONSTRAINT "FK_c67493500b5665c42f1b7c2c93e" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_to_product" ADD CONSTRAINT "FK_38a2bd98461c020d44b829d7390" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_to_product" DROP CONSTRAINT "FK_38a2bd98461c020d44b829d7390"`);
        await queryRunner.query(`ALTER TABLE "cart_to_product" DROP CONSTRAINT "FK_c67493500b5665c42f1b7c2c93e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf0747b86dba09fa338c9fb251"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a1887d3a3e63bebbdccbf33be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_05079487da1386ac776b4069f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a37d5945417d7ec9feb8ebd519"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38a2bd98461c020d44b829d739"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c67493500b5665c42f1b7c2c93"`);
        await queryRunner.query(`DROP TABLE "cart_to_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5def9a7d1f13dcaebfed62c9b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2730c0c8bc7092e4c4154edc53"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8af054e0d37fd0cf08bd97ec77"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e07a38ee6884236ea066d8de3b"`);
        await queryRunner.query(`DROP TABLE "cart"`);
    }

}
