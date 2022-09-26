import { DoctorDTO } from '@/dtos'
import { BaseModel } from '@/models'

export class DoctorModel extends BaseModel {
  userId: string
  cpf: string
  crm: string
  speciality: string

  constructor (doctor: DoctorDTO) {
    super()
    this.userId = doctor.userId
    this.cpf = doctor.cpf
    this.crm = doctor.crm
    this.speciality = doctor.speciality
    this.created_at = new Date()
    this.updated_at = null
  }
}
