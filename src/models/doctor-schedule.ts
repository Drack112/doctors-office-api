import { randomUUID } from 'node:crypto'

import { DoctorScheduleDTO } from '@/dtos'

export class DoctorScheduleModel {
  id?: string
  doctorId: string
  date: string
  time: string
  status: string
  created_at: Date
  updated_at: Date | null

  constructor (doctorSchedule: DoctorScheduleDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.doctorId = doctorSchedule.doctorId
    this.date = doctorSchedule.date
    this.time = doctorSchedule.time
    this.status = doctorSchedule.status
    this.created_at = new Date()
    this.updated_at = null
  }
}
