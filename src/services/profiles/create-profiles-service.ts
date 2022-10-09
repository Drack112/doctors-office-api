import { ProfileDTO } from '@/dtos'
import { ProfileModel } from '@/models'
import { ProfilesRepository } from '@/infra/repositories'

export class CreateProfilesService {
  constructor (private readonly profilesRepository: ProfilesRepository) {}

  async execute (params: ProfileDTO): Promise<void> {
    const profile = new ProfileModel(params)
    await this.profilesRepository.create(profile)
  }
}
