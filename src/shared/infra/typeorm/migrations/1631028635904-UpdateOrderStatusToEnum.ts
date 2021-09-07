import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateOrderStatusToEnum1631028635904
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "order_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`
    );

    await queryRunner.changeColumn(
      'orders',
      'status',
      new TableColumn({
        name: 'status',
        type: 'enum',
        enumName: 'order_status_enum',
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'orders',
      'status',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: false,
      })
    );

    await queryRunner.query('DROP TYPE "user_admin_level_enum"');
  }
}
