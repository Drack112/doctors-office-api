import { randomUUID } from 'node:crypto'

import { MigrationInterface, QueryRunner } from 'typeorm'

export class addProfilesSeeder1667065143755 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO profiles VALUES
        ('${randomUUID()}', 'administrator', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'secretary', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'doctor', CURRENT_TIMESTAMP, null)
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM profiles')
  }
}
