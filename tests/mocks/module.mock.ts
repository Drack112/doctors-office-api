
import { ModuleModel } from '@/models'
import { ModuleDTO } from '@/dtos'

export const mockModule: ModuleDTO = {
  name: 'any-name',
  description: 'any-description',
  endpoint: 'any-endpoint'
}

export const moduleModel: ModuleModel = {
  id: 'any-id',
  createdAt: new Date('2022-10-01'),
  updatedAt: null,
  ...mockModule
}
