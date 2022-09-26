import { LoginController } from '@/main/controllers/auth'
import { UsersRepository } from '@/repositories'
import { UserEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { LoginService } from '@/services/auth'

export const LoginControllerFactory = (): LoginController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new LoginService(repository)
  const controller = new LoginController(service)
  return controller
}
