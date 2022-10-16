import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class addDoctorIdPatientIdDoctorScheduleIdFksToSchedules1665886459023 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('schedules',
      new TableForeignKey({
        name: 'schedules_doctors',
        columnNames: ['doctor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'doctors',
        onDelete: 'CASCADE'
      })
    )
    await queryRunner.createForeignKey('schedules',
      new TableForeignKey({
        name: 'schedules_patients',
        columnNames: ['patient_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'patients',
        onDelete: 'CASCADE'
      })
    )
    await queryRunner.createForeignKey('schedules',
      new TableForeignKey({
        name: 'schedules_doctors_schedules',
        columnNames: ['doctor_schedule_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'doctors_schedules',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('schedules', 'schedules_doctors')
    await queryRunner.dropForeignKey('schedules', 'schedules_patients')
    await queryRunner.dropForeignKey('schedules', 'schedules_doctors_schedules')
  }
}
