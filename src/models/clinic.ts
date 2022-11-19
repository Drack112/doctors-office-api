import { ClinicDTO } from '@/dtos'
import { BaseModel } from '@/models'

export class ClinicModel extends BaseModel {
  name: string
  address: string
  cep: string
  administratorId: string
  description?: string
  typeOfClinic?: string
  phone?: string

  constructor (clinic: ClinicDTO, id?: string) {
    super(clinic, id)
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
