import { randomUUID } from 'node:crypto'

import { DoctorDTO } from '@/dtos'
import { environment } from '@/main/config'

import { hashSync } from 'bcryptjs'

export class DoctorModel {
  id?: string
  name: string
  email: string
  password: string
  cpf: string
  crm: string
  speciality: string
  created_at: Date
  updated_at: Date | null

  constructor (doctor: DoctorDTO) {
    if (!this.id) {
      this.id = randomUUID()
    }
    this.name = doctor.name
    this.email = doctor.email
    this.password = hashSync(doctor.password, environment.encrypt.salt)
    this.cpf = doctor.cpf
    this.crm = doctor.crm
    this.speciality = doctor.speciality
    this.created_at = new Date()
    this.updated_at = null
  }
}
