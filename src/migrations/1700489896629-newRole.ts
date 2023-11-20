import { MigrationInterface, QueryRunner } from "typeorm";

export class NewRole1700489896629 implements MigrationInterface {
    name = 'NewRole1700489896629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('BASIC', 'CREATOR', 'ADMIN') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`access_level\` \`access_level\` enum ('30', '40', '50') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`access_level\` \`access_level\` enum ('40', '50') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('BASIC', 'ADMIN') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
    }

}
