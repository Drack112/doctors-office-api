import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class addPatientIdFkToMedicalRecords1665886904301 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('medical_records',
      new TableForeignKey({
        name: 'medical_records_patients',
        columnNames: ['patient_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'patients',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('medical_records', 'medical_records_patients')
  }
}
