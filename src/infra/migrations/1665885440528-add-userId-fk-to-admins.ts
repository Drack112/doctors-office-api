import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class addUserIdFkToAdmins1665885440528 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('admins',
      new TableForeignKey({
        name: 'admins_users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('admins', 'admins_users')
  }
}
