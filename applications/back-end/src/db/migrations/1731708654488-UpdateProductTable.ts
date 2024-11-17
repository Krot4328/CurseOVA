import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class UpdateProductTable1731708654488 implements MigrationInterface {
  name = 'UpdateProductTable1731708654488'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_53e284f139bfad644bcbd60d54" ON "product_to_tag" ("productId", "tagId") `,
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c292514a770c54d4b5e61b7329" ON "product_to_image" ("productId", "imageId") `,
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_c292514a770c54d4b5e61b7329"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_53e284f139bfad644bcbd60d54"`)
  }
}
