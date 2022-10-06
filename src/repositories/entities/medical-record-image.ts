import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('medical_records_images')
export class MedicalRecordImageEntity {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'medical_record_id' })
  medicalRecordId!: string

  @Column({ name: 'medical_record_url' })
  medicalRecordUrl!: string

  @Column()
  created_at!: Date
}
