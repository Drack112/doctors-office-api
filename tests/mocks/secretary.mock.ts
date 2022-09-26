import { SecretaryModel } from '@/models'
import { SecretaryDTO } from '@/dtos'

export const mockSecretary: SecretaryDTO = {
  userId: 'any-user-id',
  cpf: 'any-cpf'
}

export const secretaryModel: SecretaryModel = {
  id: 'any-id',
  created_at: new Date('2022-09-01'),
  updated_at: null,
  ...mockSecretary
}
