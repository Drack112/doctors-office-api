
import { DoctorScheduleModel } from '@/models'
import { DoctorScheduleDTO, StatusEnum } from '@/dtos'

export const mockDoctorSchedule: DoctorScheduleDTO = {
  doctorId: 'any-doctor-id',
  date: '22/10/2022',
  time: '15:00',
  status: StatusEnum.available
}

export const doctorScheduleModel: DoctorScheduleModel = {
  id: 'any-id',
  created_at: new Date('2022-09-01'),
  updated_at: null,
  ...mockDoctorSchedule
}
