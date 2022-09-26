import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createDoctorsTable1662169562909 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors',
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
            name: 'cpf',
            type: 'varchar'
          },
          {
            name: 'crm',
            type: 'varchar'
          },
          {
            name: 'speciality',
            type: 'varchar'
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
    await queryRunner.dropTable('doctors')
  }
}
