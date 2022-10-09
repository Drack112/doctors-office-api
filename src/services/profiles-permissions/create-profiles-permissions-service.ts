import { ProfilePermissionDTO } from '@/dtos'
import { ProfilePermissionModel } from '@/models'
import { ProfilesPermissionsRepository } from '@/infra/repositories'

export class CreateProfilesPermissionsService {
  constructor (private readonly profilesPermissionsRepository: ProfilesPermissionsRepository) {}

  async execute (params: ProfilePermissionDTO): Promise<void> {
    const profilePermission = new ProfilePermissionModel(params)
    await this.profilesPermissionsRepository.create(profilePermission)
  }
}
