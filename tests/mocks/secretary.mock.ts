import { SecretaryModel } from '@/models'
import { SecretaryDTO } from '@/dtos'

export const mockSecretary: SecretaryDTO = {
  userId: 'any-user-id',
  cpf: 'any-cpf'
}

export const secretaryModel: SecretaryModel = {
  id: 'any-id',
  createdAt: new Date('2022-09-01'),
  updatedAt: null,
  ...mockSecretary
}
