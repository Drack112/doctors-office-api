import { GetAdminsByIdController } from '@/main/controllers/admins'
import { AdminsRepository } from '@/repositories'
import { GetAdminsByIdService } from '@/services/admins'
import { AdminEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetAdminsByIdControllerFactory = (): GetAdminsByIdController => {
  const model = mysqlSource.getRepository(AdminEntity)
  const repository = new AdminsRepository(model)
  const service = new GetAdminsByIdService(repository)
  const controller = new GetAdminsByIdController(service)
  return controller
}
