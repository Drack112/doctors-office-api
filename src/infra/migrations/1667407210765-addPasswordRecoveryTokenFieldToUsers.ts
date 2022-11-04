import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addPasswordRecoveryTokenFieldToUsers1667407210765 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'password_recovery_token',
      type: 'varchar',
      isNullable: true,
      default: null
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'password_recovery_token')
  }
}
