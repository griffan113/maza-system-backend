import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';

export default class CreateAdminUserSeed1631369918617
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash('$maza2021', 8);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('users')
      .values({
        name: 'Administrador',
        email: 'mazaafiacao@gmail.com',
        password,
      })
      .returning('id')
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from('users')
      .where('email = :email', { email: 'mazaafiacao@gmail.com' })
      .execute();
  }
}
