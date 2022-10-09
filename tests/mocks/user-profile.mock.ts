
import { UserProfileModel } from '@/models'
import { UserProfileDTO } from '@/dtos'

export const mockUserProfile: UserProfileDTO = {
  userId: 'any-userId',
  profileId: 'any-profileId'
}

export const userProfileModel: UserProfileModel = {
  id: 'any-id',
  created_at: new Date('2022-10-01'),
  updated_at: null,
  ...mockUserProfile
}
