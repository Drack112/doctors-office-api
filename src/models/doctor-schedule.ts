import { randomUUID } from 'node:crypto'

import { DoctorScheduleDTO, StatusEnum } from '@/dtos'

export class DoctorScheduleModel {
  public setObject (doctorSchedule: DoctorScheduleDTO) {
    const schedulesToCreate = []
    const { schedules, doctorId } = doctorSchedule
    for (const { date, time } of schedules) {
      schedulesToCreate.push({
        id: randomUUID(),
        doctorId,
        date,
        time,
        status: StatusEnum.available,
        createdAt: new Date(),
        updatedAt: null
      })
    }
    return schedulesToCreate
  }
}
