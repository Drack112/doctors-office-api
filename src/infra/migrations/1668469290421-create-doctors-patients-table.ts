import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createDoctorsPatientsTable1668469290421 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors_patients',
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
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors_patients')
  }
}
