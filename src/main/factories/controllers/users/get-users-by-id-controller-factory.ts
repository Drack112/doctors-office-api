import { GetUsersByIdController } from '@/main/controllers/users'
import { UsersRepository } from '@/infra/repositories'
import { GetUsersByIdService } from '@/services/users'
import { UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const GetUsersByIdControllerFactory = (): GetUsersByIdController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new GetUsersByIdService(repository)
  const controller = new GetUsersByIdController(service)
  return controller
}
