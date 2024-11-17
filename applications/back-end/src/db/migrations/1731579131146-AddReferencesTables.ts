import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReferencesTables1731579131146 implements MigrationInterface {
    name = 'AddReferencesTables1731579131146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tagGroupId" uuid NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_462d21235b3c6d12c6347e50d3" ON "tag" ("tagGroupId") `);
        await queryRunner.query(`CREATE TABLE "tag_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_e981aec841941757b9f25ba384e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userGid" uuid, "fieldname" text NOT NULL, "originalname" text NOT NULL, "encoding" text NOT NULL, "mimetype" text NOT NULL, "size" integer NOT NULL, "destination" text NOT NULL, "filename" text NOT NULL, "path" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_566c6e0d5290c4882ce91cd3c9" ON "file" ("fieldname") `);
        await queryRunner.query(`CREATE INDEX "IDX_c78cf9930a101b8fe67fa1ef97" ON "file" ("originalname") `);
        await queryRunner.query(`CREATE INDEX "IDX_23e7045fd9382f956cb8fe9ba4" ON "file" ("encoding") `);
        await queryRunner.query(`CREATE INDEX "IDX_a9e1760ffa845ed4c44e029d6c" ON "file" ("mimetype") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca476d318b3ac63531e4bd6847" ON "file" ("size") `);
        await queryRunner.query(`CREATE INDEX "IDX_1c4fbd4e83c6e1e66232dff906" ON "file" ("destination") `);
        await queryRunner.query(`CREATE INDEX "IDX_51e2d4c72df88f28a560615379" ON "file" ("filename") `);
        await queryRunner.query(`CREATE INDEX "IDX_068984316f2b10a398fcdef59c" ON "file" ("path") `);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "tackle"`);
        await queryRunner.query(`DROP TYPE "public"."product_tackle_enum"`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_462d21235b3c6d12c6347e50d3d" FOREIGN KEY ("tagGroupId") REFERENCES "tag_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_462d21235b3c6d12c6347e50d3d"`);
        await queryRunner.query(`CREATE TYPE "public"."product_tackle_enum" AS ENUM('Rod', 'Reel', 'Line', 'Hook', 'Sinkers', 'Floats', 'Lures', 'Bait', 'Swivels', 'Leaders', 'Nets', 'Traps', 'TackleBox')`);
        await queryRunner.query(`ALTER TABLE "product" ADD "tackle" "public"."product_tackle_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_068984316f2b10a398fcdef59c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_51e2d4c72df88f28a560615379"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c4fbd4e83c6e1e66232dff906"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca476d318b3ac63531e4bd6847"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9e1760ffa845ed4c44e029d6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23e7045fd9382f956cb8fe9ba4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c78cf9930a101b8fe67fa1ef97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_566c6e0d5290c4882ce91cd3c9"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "tag_group"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_462d21235b3c6d12c6347e50d3"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
