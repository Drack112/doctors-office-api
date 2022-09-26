import { randomUUID } from 'node:crypto'

import { DoctorModel } from '@/models'
import { DoctorDTO } from '@/dtos'

export const mockUUID = randomUUID()

export const mockDoctor: DoctorDTO = {
  userId: 'any-user-id',
  crm: 'any-crm',
  cpf: 'any-cpf',
  speciality: 'any-speciality'
}

export const doctorModel: DoctorModel = {
  id: 'any-id',
  created_at: new Date('2022-09-01'),
  updated_at: null,
  ...mockDoctor
}
