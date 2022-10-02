import { Column, Entity } from 'typeorm'

@Entity('medical_records')
export class MedicalRecordEntity {
  @Column()
  id!: string

  @Column()
  date!: Date

  @Column()
  description!: string

  @Column({ name: 'patient_id' })
  patientId!: string
}
