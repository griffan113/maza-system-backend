import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClient1630169815858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'company_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'financial_contact_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'technician_contact_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'financial_contact_email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'technician_contact_email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'invoice_email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
