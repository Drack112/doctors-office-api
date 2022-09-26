import { DeleteUsersController } from '@/main/controllers/users'
import { UsersRepository } from '@/repositories'
import { DeleteUsersService } from '@/services/users'
import { UserEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const DeleteUsersControllerFactory = (): DeleteUsersController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new DeleteUsersService(repository)
  const controller = new DeleteUsersController(service)
  return controller
}
