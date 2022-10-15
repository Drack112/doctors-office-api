import { LoginController } from '@/main/controllers/auth'
import { AdminsRepository, UsersRepository } from '@/infra/repositories'
import { AdminEntity, UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { LoginService } from '@/services/auth'

export const LoginControllerFactory = (): LoginController => {
  const userModel = mysqlSource.getRepository(UserEntity)
  const adminModel = mysqlSource.getRepository(AdminEntity)
  const usersRepository = new UsersRepository(userModel)
  const adminsRepository = new AdminsRepository(adminModel)
  const service = new LoginService(usersRepository, adminsRepository)
  const controller = new LoginController(service)
  return controller
}
