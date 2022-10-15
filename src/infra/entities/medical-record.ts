import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('medical_records')
export class MedicalRecordEntity {
  @PrimaryColumn()
  id!: string

  @Column()
  date!: Date

  @Column()
  description!: string

  @Column({ name: 'patient_id' })
  patientId!: string

  @Column()
  createdAt!: Date
}
