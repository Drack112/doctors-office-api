import { randomUUID } from 'crypto'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class addModulesSeeder1667749471149 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO modules VALUES
        ('${randomUUID()}', 'Users', '/users', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Specific Users', '/users/:id', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Patients', '/patients', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Specific Patients', '/patients/:id', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Generate Patients PDF', '/patients/generate-pdf', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Doctors', '/doctors', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Doctors schedules by doctorId', '/doctors/schedules', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Doctors schedules by doctorId (secretaries)', '/doctors/schedules/:doctorId?', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Clinics', '/clinics', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Specific Clinics', '/clinics/:id', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Schedules', '/schedules', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Specific Schedules',  '/schedules/:id', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Doctors Schedules', '/doctors-schedules', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Specific Doctors Schedules', '/doctors-schedules/:id', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Medical Records', '/medical-records', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Medical Records Images - POST', '/medical-records-images', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Medical Records Images - GET', '/medical-records-images/:medicalRecordId', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Dashboard', '/dashboard', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Profiles', '/profiles', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Profiles Permissions', '/profiles-permissions', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Secretaries by clinic', '/secretaries-by-clinic/:clinicId', CURRENT_TIMESTAMP, null)
        ('${randomUUID()}', 'Doctors by clinic', '/doctors-by-clinic/:clinicId', CURRENT_TIMESTAMP, null)
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM modules')
  }
}
