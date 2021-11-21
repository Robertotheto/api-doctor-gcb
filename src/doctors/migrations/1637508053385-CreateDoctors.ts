import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDoctors1637508053385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'crm',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'landline',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'cellphone',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'CEP',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'medicalspecialties',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors');
  }
}
