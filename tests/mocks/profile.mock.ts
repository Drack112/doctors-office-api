
import { ProfileModel } from '@/models'
import { ProfileDTO } from '@/dtos'

export const mockProfile: ProfileDTO = {
  name: 'any-name'
}

export const profileModel: ProfileModel = {
  id: 'any-id',
  created_at: new Date('2022-10-01'),
  updated_at: null,
  ...mockProfile
}
