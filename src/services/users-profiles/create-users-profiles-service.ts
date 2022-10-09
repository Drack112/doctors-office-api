import { UserProfileDTO } from '@/dtos'
import { UserProfileModel } from '@/models'
import { UsersProfilesRepository } from '@/infra/repositories'

export class CreateUsersProfilesService {
  constructor (private readonly usersProfilesRepository: UsersProfilesRepository) {}

  async execute (params: UserProfileDTO): Promise<void> {
    const userProfile = new UserProfileModel(params)
    await this.usersProfilesRepository.create(userProfile)
  }
}
