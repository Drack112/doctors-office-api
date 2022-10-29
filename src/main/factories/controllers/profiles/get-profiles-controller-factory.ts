import { GetProfilesController } from '@/main/controllers/profiles'
import { ProfilesRepository } from '@/infra/repositories'
import { ProfileEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { GetProfilesService } from '@/services/profiles'

export const GetProfilesControllerFactory = (): GetProfilesController => {
  const model = mysqlSource.getRepository(ProfileEntity)
  const repository = new ProfilesRepository(model)
  const service = new GetProfilesService(repository)
  const controller = new GetProfilesController(service)
  return controller
}
