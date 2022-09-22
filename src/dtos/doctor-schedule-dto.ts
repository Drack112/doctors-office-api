export enum StatusEnum {
  available = 'available',
  unavailable = 'unavailable'
}

export type ScheduleDTO = {
  date: string
  time: string
}

export type DoctorScheduleDTO = {
  doctor_id: string
  schedules: ScheduleDTO[]
  status: StatusEnum
}
