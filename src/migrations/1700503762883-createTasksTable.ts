import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1700503762883 implements MigrationInterface {
    name = 'CreateTasksTable1700503762883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp NOT NULL, \`task_name\` varchar(255) NOT NULL, \`task_description\` varchar(255) NOT NULL, \`status\` enum ('CREATED', 'IN_PROGRESS', 'DONE') NOT NULL, \`responsible_name\` varchar(255) NOT NULL, \`project_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_9eecdb5b1ed8c7c2a1b392c28d4\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_9eecdb5b1ed8c7c2a1b392c28d4\``);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`DROP TABLE \`tasks\``);
    }

}
