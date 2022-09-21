export enum StatusEnum {
  available = 'available',
  unavailable = 'unavailable'
}

export type DoctorScheduleDTO = {
  doctorId: string
  date: string
  time: string
  status: StatusEnum
}
