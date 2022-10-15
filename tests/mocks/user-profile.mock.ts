
import { UserProfileModel } from '@/models'
import { UserProfileDTO } from '@/dtos'

export const mockUserProfile: UserProfileDTO = {
  userId: 'any-userId',
  profileId: 'any-profileId'
}

export const userProfileModel: UserProfileModel = {
  id: 'any-id',
  createdAt: new Date('2022-10-01'),
  updatedAt: null,
  ...mockUserProfile
}
