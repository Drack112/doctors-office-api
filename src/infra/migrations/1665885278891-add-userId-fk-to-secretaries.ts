import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class addUserIdFkToSecretaries1665885278891 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('secretaries',
      new TableForeignKey({
        name: 'secretaries_users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('secretaries', 'secretaries_users')
  }
}
