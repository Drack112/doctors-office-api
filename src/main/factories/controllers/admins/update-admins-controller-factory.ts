import { UpdateAdminsController } from '@/main/controllers/admins'
import { AdminsRepository } from '@/repositories'
import { UpdateAdminsService } from '@/services/admins'
import { AdminEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const UpdateAdminsControllerFactory = (): UpdateAdminsController => {
  const model = mysqlSource.getRepository(AdminEntity)
  const repository = new AdminsRepository(model)
  const service = new UpdateAdminsService(repository)
  const controller = new UpdateAdminsController(service)
  return controller
}
