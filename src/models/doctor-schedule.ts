import { randomUUID } from 'node:crypto'

import { DoctorScheduleDTO, StatusEnum } from '@/dtos'

export class DoctorScheduleModel {
  public setObject (doctorSchedule: DoctorScheduleDTO) {
    const schedulesToCreate = []
    const { schedules, doctor_id } = doctorSchedule
    for (const { date, time } of schedules) {
      schedulesToCreate.push({
        id: randomUUID(),
        doctor_id,
        date,
        time,
        status: StatusEnum.available,
        created_at: new Date(),
        updated_at: null
      })
    }
    return schedulesToCreate
  }
}
