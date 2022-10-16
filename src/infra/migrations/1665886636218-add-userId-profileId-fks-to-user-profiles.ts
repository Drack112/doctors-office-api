import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class addUserIdProfileIdFksToUserProfiles1665886636218 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('users_profiles',
      new TableForeignKey({
        name: 'users_profiles_users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE'
      })
    )
    await queryRunner.createForeignKey('users_profiles',
      new TableForeignKey({
        name: 'users_profiles_profiles',
        columnNames: ['profile_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'profiles',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users_profiles', 'users_profiles_users')
    await queryRunner.dropForeignKey('users_profiles', 'users_profiles_profiles')
  }
}
