import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class addUserIdFkToDoctors1665885650438 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('doctors',
      new TableForeignKey({
        name: 'doctors_users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('doctors', 'doctors_users')
  }
}
