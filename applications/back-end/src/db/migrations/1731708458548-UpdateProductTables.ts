import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class UpdateProductTables1731708458548 implements MigrationInterface {
  name = 'UpdateProductTables1731708458548'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_to_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" uuid NOT NULL, "imageId" uuid NOT NULL, CONSTRAINT "PK_ec819e6c166b5ba3925b4022205" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_6317b151ae8f4d3bdce9091bba" ON "product_to_image" ("productId") `)
    await queryRunner.query(`CREATE INDEX "IDX_0a214c6f3ca2972a6bf9213160" ON "product_to_image" ("imageId") `)
    await queryRunner.query(
      `CREATE TABLE "product_to_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_3af32b0a04fd895277c0778c803" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE INDEX "IDX_98428a3b47d78823d8f7d5aeb5" ON "product_to_tag" ("productId") `)
    await queryRunner.query(`CREATE INDEX "IDX_15a9d3ddee8ca9cb4cf9e50448" ON "product_to_tag" ("tagId") `)
    await queryRunner.query(`CREATE TYPE "public"."product_pricecurrency_enum" AS ENUM('uah')`)
    await queryRunner.query(
      `ALTER TABLE "product" ADD "priceCurrency" "public"."product_pricecurrency_enum" NOT NULL DEFAULT 'uah'`,
    )
    await queryRunner.query(
      `ALTER TABLE "product_to_image" ADD CONSTRAINT "FK_6317b151ae8f4d3bdce9091bbab" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "product_to_image" ADD CONSTRAINT "FK_0a214c6f3ca2972a6bf92131604" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "product_to_tag" ADD CONSTRAINT "FK_98428a3b47d78823d8f7d5aeb55" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "product_to_tag" ADD CONSTRAINT "FK_15a9d3ddee8ca9cb4cf9e504485" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product_to_tag" DROP CONSTRAINT "FK_15a9d3ddee8ca9cb4cf9e504485"`)
    await queryRunner.query(`ALTER TABLE "product_to_tag" DROP CONSTRAINT "FK_98428a3b47d78823d8f7d5aeb55"`)
    await queryRunner.query(`ALTER TABLE "product_to_image" DROP CONSTRAINT "FK_0a214c6f3ca2972a6bf92131604"`)
    await queryRunner.query(`ALTER TABLE "product_to_image" DROP CONSTRAINT "FK_6317b151ae8f4d3bdce9091bbab"`)
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "priceCurrency"`)
    await queryRunner.query(`DROP TYPE "public"."product_pricecurrency_enum"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_15a9d3ddee8ca9cb4cf9e50448"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_98428a3b47d78823d8f7d5aeb5"`)
    await queryRunner.query(`DROP TABLE "product_to_tag"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_0a214c6f3ca2972a6bf9213160"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_6317b151ae8f4d3bdce9091bba"`)
    await queryRunner.query(`DROP TABLE "product_to_image"`)
  }
}
