import { PatientModel } from '@/models'
import { PatientDTO } from '@/dtos'

export const mockPatient: PatientDTO = {
  name: 'any-name',
  email: 'any-email',
  cpf: 'any-cpf',
  gender: 'any-gender',
  phone: 'any-phone',
  cep: 'any-cep',
  address: 'any-address',
  birthOfDate: 'any-birthOfDate'
}

export const patientModel: PatientModel = {
  id: 'any-id',
  created_at: new Date('2022-09-01'),
  updated_at: null,
  ...mockPatient
}
