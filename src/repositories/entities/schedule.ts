import { BaseModel } from './base-model'
import { Column, Entity } from 'typeorm'

@Entity('schedules')
export class ScheduleEntity extends BaseModel {
  @Column({ name: 'doctor_id' })
  doctorId!: string

  @Column({ name: 'patient_id' })
  patientId!: string

  @Column({ name: 'doctor_schedule_id' })
  doctorScheduleId!: string

  @Column({ name: 'created_by' })
  createdBy!: string
}
