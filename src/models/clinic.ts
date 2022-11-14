import { randomUUID } from 'node:crypto'

import { ClinicDTO } from '@/dtos'

export class ClinicModel {
  id?: string
  name: string
  address: string
  cep: string
  administratorId: string
  description?: string
  typeOfClinic?: string
  phone?: string
  createdAt: Date
  updatedAt: Date | null

  constructor (clinic: ClinicDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.name = clinic.name
    this.description = clinic.description
    this.phone = clinic.phone
    this.cep = clinic.cep
    this.typeOfClinic = clinic.typeOfClinic
    this.administratorId = clinic.administratorId
    this.address = clinic.address
    this.createdAt = new Date()
    this.updatedAt = null
  }
}
