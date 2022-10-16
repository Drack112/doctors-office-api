import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class addMedicalRecordIdFkToMedicalRecordsImages1665886979754 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('medical_records_images',
      new TableForeignKey({
        name: 'medical_records_images_medical_records',
        columnNames: ['medical_record_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'medical_records',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('medical_records_images', 'medical_records_images_medical_records')
  }
}
