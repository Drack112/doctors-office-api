
import { ScheduleModel } from '@/models'
import { SchedulesDTO } from '@/dtos'

export const mockSchedule: SchedulesDTO = {
  doctorId: 'any-doctorId',
  doctorScheduleId: 'any-doctorScheduleId',
  patientId: 'any-patientId',
  createdBy: 'yan'
}

export const scheduleModel: ScheduleModel = {
  id: 'any-id',
  created_at: new Date('2022-09-01'),
  ...mockSchedule
}
