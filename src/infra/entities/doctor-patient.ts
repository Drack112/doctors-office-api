import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('doctors_patients')
export class DoctorPatientEntity {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'doctor_id' })
  doctorId!: string

  @Column({ name: 'patient_id' })
  patientId!: string
}
