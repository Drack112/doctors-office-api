import { CreateUsersController } from '@/main/controllers/users'
import { UsersRepository } from '@/infra/repositories'
import { UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { CreateUsersService } from '@/services/users'

export const CreateUsersControllerFactory = (): CreateUsersController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new CreateUsersService(repository)
  const controller = new CreateUsersController(service)
  return controller
}
