import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateClientColumns1630705387565
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "person_type_enum" AS ENUM('legal', 'physical')`
    );

    await queryRunner.addColumn(
      'clients',
      new TableColumn({
        name: 'person_type',
        type: 'enum',
        enumName: 'person_type_enum',
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TYPE "person_type_enum"');

    await queryRunner.dropColumn('clients', 'person_type');
  }
}
