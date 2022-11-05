import { ResetUsersPasswordController } from '@/main/controllers/users'
import { UsersRepository, UsersTokensRepository } from '@/infra/repositories'
import { ResetUsersPasswordService } from '@/services/users'
import { UserEntity, UserTokenEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { DateFNSProviderFactory } from '@/main/factories/infra/date/date-fns-factory'

export const ResetUsersPasswordControllerFactory = (): ResetUsersPasswordController => {
  const userModel = mysqlSource.getRepository(UserEntity)
  const usersRepository = new UsersRepository(userModel)
  const userTokenModel = mysqlSource.getRepository(UserTokenEntity)
  const usersTokensRepository = new UsersTokensRepository(userTokenModel)
  const service = new ResetUsersPasswordService(usersRepository, usersTokensRepository, DateFNSProviderFactory())
  const controller = new ResetUsersPasswordController(service)
  return controller
}
