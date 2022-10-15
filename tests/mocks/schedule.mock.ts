
import { ScheduleModel } from '@/models'
import { SchedulesDTO } from '@/dtos'
import { sessionUserId } from '@/tests/mocks'

export const mockSchedule: SchedulesDTO = {
  doctorId: 'any-doctorId',
  doctorScheduleId: 'any-doctorScheduleId',
  patientId: 'any-patientId',
  createdBy: sessionUserId
}

export const scheduleModel: ScheduleModel = {
  id: 'any-id',
  createdAt: new Date('2022-09-01'),
  ...mockSchedule
}
