import { LoginController } from '@/main/controllers/auth'
import { UsersRepository } from '@/infra/repositories'
import { UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { LoginService } from '@/services/auth'

export const LoginControllerFactory = (): LoginController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new LoginService(repository)
  const controller = new LoginController(service)
  return controller
}
