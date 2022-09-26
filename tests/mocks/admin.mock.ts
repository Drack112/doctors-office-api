
import { AdminModel } from '@/models'
import { AdminDTO, SituationStatusEnum } from '@/dtos'

export const mockAdmin: AdminDTO = {
  userId: 'any-user-id',
  situation: SituationStatusEnum.active,
  cpf: 'any-cpf'
}

export const adminModel: AdminModel = {
  id: 'any-id',
  created_at: new Date('2022-09-01'),
  updated_at: null,
  ...mockAdmin
}
