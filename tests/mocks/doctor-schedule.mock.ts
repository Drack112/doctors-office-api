
import { DoctorScheduleModel } from '@/models'
import { DoctorScheduleDTO, StatusEnum } from '@/dtos'

export const mockDoctorSchedule: DoctorScheduleDTO = {
  doctor_id: 'any-doctor-id',
  schedules: [
    { date: '22/10/2022', time: '15:00' },
    { date: '22/10/2022', time: '15:00' }
  ],
  status: StatusEnum.available
}

export const mockDoctorSchedulesByDoctorId = [
  {
    id: 'any-id',
    doctor_id: 'any-doctor-id',
    schedules: [
      { date: '22/10/2022', time: '15:00' },
      { date: '22/10/2022', time: '15:00' }
    ],
    status: StatusEnum.available,
    created_at: new Date(),
    updated_at: null
  }
]

export const doctorScheduleModel = new DoctorScheduleModel()
