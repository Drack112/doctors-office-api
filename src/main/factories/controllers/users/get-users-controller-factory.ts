import { GetUsersController } from '@/main/controllers/users'
import { UsersRepository } from '@/repositories'
import { GetUsersService } from '@/services/users'
import { UserEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetUsersControllerFactory = (): GetUsersController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new GetUsersService(repository)
  const controller = new GetUsersController(service)
  return controller
}
