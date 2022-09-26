import { GetUsersByIdController } from '@/main/controllers/users'
import { UsersRepository } from '@/repositories'
import { GetUsersByIdService } from '@/services/users'
import { UserEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetUsersByIdControllerFactory = (): GetUsersByIdController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new GetUsersByIdService(repository)
  const controller = new GetUsersByIdController(service)
  return controller
}
