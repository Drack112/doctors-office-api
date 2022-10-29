import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class addModuleIdUserProfileIdFksToProfilesPermissions1665886756827 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('profiles_permissions',
      new TableForeignKey({
        name: 'profiles_permissions_modules',
        columnNames: ['module_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'modules',
        onDelete: 'CASCADE'
      })
    )
    await queryRunner.createForeignKey('profiles_permissions',
      new TableForeignKey({
        name: 'profiles_permissions_profiles',
        columnNames: ['profile_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'profiles',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('profiles_permissions', 'profiles_permissions_modules')
    await queryRunner.dropForeignKey('profiles_permissions', 'profiles_permissions_profiles')
  }
}
