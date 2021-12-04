import {MigrationInterface, QueryRunner} from "typeorm";

export default class CreateDoctorTable1638649455514 implements MigrationInterface {
    name = 'CreateDoctorTable1638649455514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`doctors\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(120) NOT NULL, \`crm\` int NOT NULL, \`landline\` bigint NOT NULL, \`cellphone\` bigint NOT NULL, \`CEP\` json NOT NULL, \`medicalspecialties\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`doctors\` `);
    }

}
