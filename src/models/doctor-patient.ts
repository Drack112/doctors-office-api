import { randomUUID } from 'node:crypto'

import { DoctorPatientDTO } from '@/dtos'

export class DoctorPatientModel {
  id?: string
  doctorId: string
  patientId: string

  constructor (doctorPatient: DoctorPatientDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.doctorId = doctorPatient.doctorId
    this.patientId = doctorPatient.patientId
  }
}
