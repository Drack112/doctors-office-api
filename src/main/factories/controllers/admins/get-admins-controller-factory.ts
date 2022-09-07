import { GetAdminsController } from '@/main/controllers/admins'
import { AdminsRepository } from '@/repositories'
import { GetAdminsService } from '@/services/admins'
import { AdminEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetAdminsControllerFactory = (): GetAdminsController => {
  const model = mysqlSource.getRepository(AdminEntity)
  const repository = new AdminsRepository(model)
  const service = new GetAdminsService(repository)
  const controller = new GetAdminsController(service)
  return controller
}
