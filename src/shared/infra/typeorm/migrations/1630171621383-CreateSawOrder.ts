import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSawOrder1630171621383 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'saw_orders',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'saw_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'teeth_number',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'teeth_value',
            type: 'bigint',
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

    await queryRunner.createForeignKey(
      'saw_orders',
      new TableForeignKey({
        name: 'belonging_order',
        columnNames: ['order_id'],
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('saw_orders', 'belonging_order');

    await queryRunner.dropTable('saw_orders');
  }
}
