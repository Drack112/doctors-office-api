
import { AdminModel } from '@/models'
import { AdminDTO, SituationStatusEnum } from '@/dtos'

export const mockAdmin: AdminDTO = {
  userId: 'any-user-id',
  situation: SituationStatusEnum.active,
  cpf: 'any-cpf'
}

export const adminModel: AdminModel = {
  id: 'any-id',
  createdAt: new Date('2022-09-01'),
  updatedAt: null,
  ...mockAdmin
}
