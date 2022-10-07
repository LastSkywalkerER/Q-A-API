import { MigrationInterface, QueryRunner } from "typeorm";

export class init1665145850262 implements MigrationInterface {
    name = 'init1665145850262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "author" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "dateOfCreation" character varying NOT NULL, "dateOfUpdate" character varying NOT NULL, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "questionId" integer NOT NULL, "text" character varying NOT NULL, "author" character varying NOT NULL, "rating" integer NOT NULL, "dateOfCreation" character varying NOT NULL, "dateOfUpdate" character varying NOT NULL, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions_tags_tags" ("questionsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_6c1ea3a815ea62263aaf7cfcd80" PRIMARY KEY ("questionsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_91353dfa02de18aeab04ef3a60" ON "questions_tags_tags" ("questionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ebfd7ef95ffa54c9997580c8d2" ON "questions_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_d088631a7a4a4001e833031e557" FOREIGN KEY ("author") REFERENCES "users"("email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_89da78c5d205db5374edbb1bc40" FOREIGN KEY ("author") REFERENCES "users"("email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" ADD CONSTRAINT "FK_91353dfa02de18aeab04ef3a60e" FOREIGN KEY ("questionsId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" ADD CONSTRAINT "FK_ebfd7ef95ffa54c9997580c8d27" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" DROP CONSTRAINT "FK_ebfd7ef95ffa54c9997580c8d27"`);
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" DROP CONSTRAINT "FK_91353dfa02de18aeab04ef3a60e"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_89da78c5d205db5374edbb1bc40"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_d088631a7a4a4001e833031e557"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ebfd7ef95ffa54c9997580c8d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91353dfa02de18aeab04ef3a60"`);
        await queryRunner.query(`DROP TABLE "questions_tags_tags"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
