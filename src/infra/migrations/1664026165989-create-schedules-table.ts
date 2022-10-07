import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createSchedulesTable1664026165989 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schedules',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'doctor_id',
            type: 'varchar'
          },
          {
            name: 'patient_id',
            type: 'varchar'
          },
          {
            name: 'doctor_schedule_id',
            type: 'varchar'
          },
          {
            name: 'created_by',
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
    await queryRunner.dropTable('schedules')
  }
}
