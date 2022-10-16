import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class addDoctorIdFkToDoctorsSchedules1665886275526 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('doctors_schedules',
      new TableForeignKey({
        name: 'doctors_schedules_doctors',
        columnNames: ['doctor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'doctors',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('doctors_schedules', 'doctors_schedules_doctors')
  }
}
