import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCartTable1732049222060 implements MigrationInterface {
    name = 'UpdateCartTable1732049222060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "firstName" character varying`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "department" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."cart_paymentstatus_enum" AS ENUM('pending', 'processing', 'paid', 'completed', 'failed')`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "paymentStatus" "public"."cart_paymentstatus_enum" DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`DROP TYPE "public"."cart_paymentstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "department"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "firstName"`);
    }

}
