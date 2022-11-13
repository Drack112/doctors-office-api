import { RefreshTokenController } from '@/main/controllers/auth'
import { UsersRepository } from '@/infra/repositories'
import { UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { RefreshTokenService } from '@/services/auth'

export const RefreshTokenControllerFactory = (): RefreshTokenController => {
  const userModel = mysqlSource.getRepository(UserEntity)
  const usersRepository = new UsersRepository(userModel)
  const service = new RefreshTokenService(usersRepository)
  const controller = new RefreshTokenController(service)
  return controller
}
