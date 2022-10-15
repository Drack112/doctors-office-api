import { randomUUID } from 'node:crypto'

import { SchedulesDTO } from '@/dtos'

export class ScheduleModel {
  id?: string
  doctorId: string
  patientId: string
  doctorScheduleId: string
  createdAt: Date
  createdBy?: string

  constructor (schedule: SchedulesDTO, userId: string) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.doctorId = schedule.doctorId
    this.patientId = schedule.patientId
    this.doctorScheduleId = schedule.doctorScheduleId
    this.createdBy = userId
    this.createdAt = new Date()
  }
}
