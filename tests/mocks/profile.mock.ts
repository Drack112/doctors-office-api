
import { ProfileModel } from '@/models'
import { ProfileDTO } from '@/dtos'

export const mockProfile: ProfileDTO = {
  name: 'any-name'
}

export const profileModel: ProfileModel = {
  id: 'any-id',
  createdAt: new Date('2022-10-01'),
  updatedAt: null,
  ...mockProfile
}

export const profilesResponse: ProfileModel[] = [
  { ...profileModel }
]
