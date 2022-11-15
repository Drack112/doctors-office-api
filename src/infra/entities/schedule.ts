import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryColumn()
  id!: string

  @Column({ name: 'doctor_id' })
  doctorId!: string

  @Column({ name: 'patient_id' })
  patientId!: string

  @Column({ name: 'doctor_schedule_id' })
  doctorScheduleId!: string

  @Column({ name: 'created_by' })
  createdBy!: string

  @Column({ name: 'created_at' })
  createdAt!: Date
}
