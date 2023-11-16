import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1700142976358 implements MigrationInterface {
    name = 'Init1700142976358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_projects\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, \`access_level\` enum ('40', '50') NOT NULL, \`user_id\` varchar(36) NULL, \`project_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`age\` int NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('BASIC', 'ADMIN') NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_0f280c70a3a6ab7f4cf3c658c4c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_741210c246defe00ed877a98f2a\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_741210c246defe00ed877a98f2a\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_0f280c70a3a6ab7f4cf3c658c4c\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`users_projects\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
    }

}
