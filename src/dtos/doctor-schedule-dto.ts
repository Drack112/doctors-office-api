export enum StatusEnum {
  available = 'available',
  unavailable = 'unavailable'
}

export type ScheduleDTO = {
  date: string
  time: string
}

export type DoctorScheduleDTO = {
  doctorId: string
  schedules: ScheduleDTO[]
  status: StatusEnum
}
