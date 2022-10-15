
import { ClinicModel } from '@/models'
import { ClinicDTO } from '@/dtos'

export const mockClinic: ClinicDTO = {
  name: 'any-name',
  address: 'any-address',
  cep: 'any-cep',
  description: 'any-description',
  phone: 'any-phone',
  typeOfClinic: 'any-typeOfClinic'
}

export const clinicModel: ClinicModel = {
  id: 'any-id',
  createdAt: new Date('2022-09-01'),
  updatedAt: null,
  ...mockClinic
}
