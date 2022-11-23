import { randomUUID } from 'node:crypto'

import { MigrationInterface, QueryRunner } from 'typeorm'

export class addModulesSeeder1667749471149 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO modules VALUES
        ('${randomUUID()}', 'Users', 'Users management', '/users', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Specific Users', 'Specific Users management', '/users/:id', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Patients', 'Patients management', '/patients', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Specific Patients', 'Specific Patients management', '/patients/:id', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Generate Patients PDF', 'Generate Patients PDF management', '/patients/generate-pdf', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Doctors', 'Doctors management', '/doctors', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Doctors schedules by doctorId', 'Doctors schedules by doctorId management', '/doctors/schedules', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Doctors schedules by doctorId (secretaries)', 'Doctors schedules by doctorId management', '/schedules/:doctorId', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Clinics', 'Clinics management', '/clinics', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Specific Clinics', 'Specific Clinics management', '/clinics/:id', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Schedules', 'Schedules management', '/schedules', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Specific Schedules', 'Specific Schedules management', '/schedules/:id', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Doctors Schedules', 'Doctors schedules management', '/doctors-schedules', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Specific Doctors Schedules', 'Specific Doctors schedules management', '/doctors-schedules/:id', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Medical Records', 'Medical records management', '/medical-records', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Medical Records Images - POST', 'Medical records images management', '/medical-records-images', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Medical Records Images - GET', 'List of medical records images by medicalRecordId', '/medical-records-images/:medicalRecordId', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Dashboard', 'Dashboard management', '/dashboard', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Profiles', 'Profiles management', '/profiles', CURRENT_TIMESTAMP, null),
        ('${randomUUID()}', 'Profiles Permissions', 'Profiles permissions management', '/profiles-permissions', CURRENT_TIMESTAMP, null)
    `)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM modules')
  }
}
