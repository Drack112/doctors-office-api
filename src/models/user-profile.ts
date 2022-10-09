import { UserProfileDTO } from '@/dtos'
import { BaseModel } from '@/models'

export class UserProfileModel extends BaseModel {
  userId: string
  profileId: string

  constructor (userProfile: UserProfileDTO) {
    super()
    this.userId = userProfile.userId
    this.profileId = userProfile.profileId
  }
}
