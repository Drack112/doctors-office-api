import { GetUsersController } from '@/main/controllers/users'
import { UsersRepository } from '@/infra/repositories'
import { GetUsersService } from '@/services/users'
import { UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const GetUsersControllerFactory = (): GetUsersController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new GetUsersService(repository)
  const controller = new GetUsersController(service)
  return controller
}
