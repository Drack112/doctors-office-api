import { randomUUID } from 'node:crypto'

import { PatientDTO } from '@/dtos'

export class PatientModel {
  id?: string
  name: string
  email: string
  cpf: string
  gender?: string
  phone!: string
  cep!: string
  address?: string
  birthOfDate!: string
  responsibleName?: string
  responsibleCpf?: string
  createdAt: Date
  updatedAt: Date | null

  constructor (patient: PatientDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.name = patient.name
    this.email = patient.email
    this.cpf = patient.cpf
    this.gender = patient.gender
    this.phone = patient.phone
    this.address = patient.address
    this.cep = patient.cep
    this.birthOfDate = patient.birthOfDate
    this.responsibleName = patient.responsibleName
    this.responsibleCpf = patient.responsibleCpf
    this.createdAt = new Date()
    this.updatedAt = null
  }
}
