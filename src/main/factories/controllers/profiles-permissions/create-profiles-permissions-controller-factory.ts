import { CreateProfilesPermissionsController } from '@/main/controllers/profiles-permissions'
import { ProfilesPermissionsRepository } from '@/infra/repositories'
import { ProfilePermissionEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { CreateProfilesPermissionsService } from '@/services/profiles-permissions'

export const CreateProfilesPermissionsControllerFactory = (): CreateProfilesPermissionsController => {
  const model = mysqlSource.getRepository(ProfilePermissionEntity)
  const repository = new ProfilesPermissionsRepository(model)
  const service = new CreateProfilesPermissionsService(repository)
  const controller = new CreateProfilesPermissionsController(service)
  return controller
}
