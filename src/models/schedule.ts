import { randomUUID } from 'node:crypto'

import { SchedulesDTO } from '@/dtos'

export class ScheduleModel {
  id?: string
  doctorId: string
  patientId: string
  doctorScheduleId: string
  created_at: Date
  createdBy?: string

  constructor (schedule: SchedulesDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.doctorId = schedule.doctorId
    this.patientId = schedule.patientId
    this.doctorScheduleId = schedule.doctorScheduleId
    this.created_at = new Date()
  }
}
