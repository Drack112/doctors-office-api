import { UpdateUsersController } from '@/main/controllers/users'
import { UsersRepository } from '@/infra/repositories'
import { UpdateUsersService } from '@/services/users'
import { UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const UpdateUsersControllerFactory = (): UpdateUsersController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new UpdateUsersService(repository)
  const controller = new UpdateUsersController(service)
  return controller
}
