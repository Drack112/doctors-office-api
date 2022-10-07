import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createProfilesPermissionsTable1664235376810 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles_permissions',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'module_id',
            type: 'varchar'
          },
          {
            name: 'user_profile_id',
            type: 'varchar'
          },
          {
            name: 'create',
            type: 'boolean'
          },
          {
            name: 'read',
            type: 'boolean'
          },
          {
            name: 'update',
            type: 'boolean'
          },
          {
            name: 'delete',
            type: 'boolean'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: null
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiles_permissions')
  }
}
