import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1757785956422 implements MigrationInterface {
    name = 'InitialSetup1757785956422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`suppliers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(10) NOT NULL, \`country\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_66181e465a65c2ddcfa9c00c9c\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`supplier_id\` int NOT NULL, \`title\` varchar(100) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`stock_quantity\` int NOT NULL, \`category\` enum ('ELECTRONICS', 'FASHION', 'HOME', 'OTHER') NOT NULL DEFAULT 'OTHER', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_0ec433c1e1d444962d592d86c86\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_0ec433c1e1d444962d592d86c86\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_66181e465a65c2ddcfa9c00c9c\` ON \`suppliers\``);
        await queryRunner.query(`DROP TABLE \`suppliers\``);
    }

}
