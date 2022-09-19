import { randomUUID } from 'node:crypto'

import { ClinicDTO } from '@/dtos'

export class ClinicModel {
  id?: string
  name: string
  address: string
  description?: string
  cep: string
  phone?: string
  created_at: Date
  updated_at: Date | null

  constructor (clinic: ClinicDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.name = clinic.name
    this.description = clinic.description
    this.phone = clinic.phone
    this.cep = clinic.cep
    this.address = clinic.address
    this.created_at = new Date()
    this.updated_at = null
  }
}
