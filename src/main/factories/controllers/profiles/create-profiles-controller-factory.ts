import { CreateProfilesController } from '@/main/controllers/profiles'
import { ProfilesRepository } from '@/infra/repositories'
import { ProfileEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { CreateProfilesService } from '@/services/profiles'

export const CreateProfilesControllerFactory = (): CreateProfilesController => {
  const model = mysqlSource.getRepository(ProfileEntity)
  const repository = new ProfilesRepository(model)
  const service = new CreateProfilesService(repository)
  const controller = new CreateProfilesController(service)
  return controller
}
