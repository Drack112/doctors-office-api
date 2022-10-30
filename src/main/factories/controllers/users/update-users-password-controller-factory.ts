import { UpdateUsersPasswordController } from '@/main/controllers/users'
import { UsersRepository } from '@/infra/repositories'
import { UpdateUsersPasswordService } from '@/services/users'
import { UserEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const UpdateUsersPasswordControllerFactory = (): UpdateUsersPasswordController => {
  const model = mysqlSource.getRepository(UserEntity)
  const repository = new UsersRepository(model)
  const service = new UpdateUsersPasswordService(repository)
  const controller = new UpdateUsersPasswordController(service)
  return controller
}
