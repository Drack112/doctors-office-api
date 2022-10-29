import { ProfileEntity } from '@/infra/entities'
import { ProfilesRepository } from '@/infra/repositories'

export class GetProfilesService {
  constructor (private readonly profilesRepository: ProfilesRepository) {}

  async execute (): Promise<ProfileEntity[]> {
    return await this.profilesRepository.get()
  }
}
