import { PatientDTO } from '@/dtos'
import { BaseModel } from '@/models'

export class PatientModel extends BaseModel {
  name: string
  email: string
  age: number
  height: number
  weight: number
  cpf: string
  gender?: string
  phone!: string
  cep!: string
  address?: string
  birthDate!: string
  responsibleName?: string
  responsibleDocument?: string

  constructor (patient: PatientDTO, id?: string) {
    super(patient, id)
    this.name = patient.name
    this.email = patient.email
    this.age = patient.age
    this.height = patient.height
    this.weight = patient.weight
    this.cpf = patient.cpf
    this.gender = patient.gender
    this.phone = patient.phone
    this.address = patient.address
    this.cep = patient.cep
    this.birthDate = patient.birthDate
    this.responsibleName = patient.responsibleName
    this.responsibleDocument = patient.responsibleDocument
  }
}
