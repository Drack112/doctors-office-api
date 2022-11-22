
import { DoctorScheduleModel } from '@/models'
import { DoctorScheduleDTO, StatusEnum } from '@/dtos'

export const mockDoctorSchedule: DoctorScheduleDTO = {
  doctorId: 'any-doctor-id',
  schedules: [
    { date: '22/10/2022', time: '15:00' },
    { date: '22/10/2022', time: '15:00' }
  ]
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
    createdAt: new Date(),
    updatedAt: null
  }
]

export const doctorScheduleModel = new DoctorScheduleModel()
