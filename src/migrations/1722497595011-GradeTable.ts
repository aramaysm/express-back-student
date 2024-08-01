import { MigrationInterface, QueryRunner } from "typeorm";

export class GradeTable1722497595011 implements MigrationInterface {
    name = 'GradeTable1722497595011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` CHANGE \`grade\` \`gradeId\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`grade\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_38c41081d25dc60b58f758caa9\` (\`label\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`gradeId\``);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`gradeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_30ade015a34ff975ee322b3adbd\` FOREIGN KEY (\`gradeId\`) REFERENCES \`grade\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_30ade015a34ff975ee322b3adbd\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`gradeId\``);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`gradeId\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_38c41081d25dc60b58f758caa9\` ON \`grade\``);
        await queryRunner.query(`DROP TABLE \`grade\``);
        await queryRunner.query(`ALTER TABLE \`student\` CHANGE \`gradeId\` \`grade\` varchar(255) NOT NULL`);
    }

}
