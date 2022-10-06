import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createMedicalRecordsTable1665008373072 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medical_records',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'date',
            type: 'timestamp'
          },
          {
            name: 'patient_id',
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
    await queryRunner.dropTable('medical_records')
  }
}
