import { UpdateUsersController } from '@/main/controllers/users'
import { UsersRepository } from '@/repositories'
import { UpdateUsersService } from '@/services/users'
import { UserEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const UpdateUsersControllerFactory = (): UpdateUsersController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new UpdateUsersService(repository)
  const controller = new UpdateUsersController(service)
  return controller
}
