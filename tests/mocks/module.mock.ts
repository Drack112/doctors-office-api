
import { ModuleModel } from '@/models'
import { ModuleDTO } from '@/dtos'

export const mockModule: ModuleDTO = {
  name: 'any-name',
  description: 'any-description',
  endpoint: 'any-endpoint'
}

export const moduleModel: ModuleModel = {
  id: 'any-id',
  created_at: new Date('2022-10-01'),
  updated_at: null,
  ...mockModule
}
