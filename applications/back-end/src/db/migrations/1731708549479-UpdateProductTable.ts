import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class UpdateProductTable1731708549479 implements MigrationInterface {
  name = 'UpdateProductTable1731708549479'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "pathToImage"`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "pathToImage" text`)
  }
}
