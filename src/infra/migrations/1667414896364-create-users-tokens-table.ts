import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUsersTokensTable1667414896364 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_tokens',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'user_id',
            type: 'varchar'
          },
          {
            name: 'refresh_token',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'expires_date',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_tokens')
  }
}
