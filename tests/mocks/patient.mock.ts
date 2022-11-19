import { PatientModel } from '@/models'
import { PatientDTO } from '@/dtos'

export const mockPatient: PatientDTO = {
  name: 'any-name',
  email: 'any-email',
  age: 99,
  height: 99,
  weight: 99,
  cpf: 'any-cpf',
  gender: 'any-gender',
  phone: 'any-phone',
  cep: 'any-cep',
  address: 'any-address',
  birthDate: 'any-birthOfDate',
  responsibleDocument: 'any-document',
  responsibleName: 'any-name'
}

export const patientModel: PatientModel = {
  id: 'any-id',
  createdAt: new Date('2022-09-01T00:00:00.000Z'),
  updatedAt: null,
  ...mockPatient
}
