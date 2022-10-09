import { CreateUsersProfilesController } from '@/main/controllers/users-profiles'
import { UsersProfilesRepository } from '@/infra/repositories'
import { UserProfileEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { CreateUsersProfilesService } from '@/services/users-profiles'

export const CreateUsersProfilesControllerFactory = (): CreateUsersProfilesController => {
  const model = mysqlSource.getRepository(UserProfileEntity)
  const repository = new UsersProfilesRepository(model)
  const service = new CreateUsersProfilesService(repository)
  const controller = new CreateUsersProfilesController(service)
  return controller
}
