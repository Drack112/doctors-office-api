
import { UserClinicModel } from '@/models'
import { UserClinicDTO } from '@/dtos'

export const mockUserClinic: UserClinicDTO = {
  userId: 'any-userId',
  clinicId: 'any-clinicId'
}

export const userClinicModel: UserClinicModel = {
  id: 'any-id',
  ...mockUserClinic
}
