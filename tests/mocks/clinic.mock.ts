
import { ClinicModel } from '@/models'
import { ClinicDTO } from '@/dtos'

export const mockClinic: ClinicDTO = {
  name: 'any-name',
  address: 'any-address',
  cep: 'any-cep',
  description: 'any-description',
  phone: 'any-phone'
}

export const clinicModel: ClinicModel = {
  id: 'any-id',
  created_at: new Date('2022-09-01'),
  updated_at: null,
  ...mockClinic
}
