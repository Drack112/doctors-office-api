import { DeleteAdminsController } from '@/main/controllers/admins'
import { AdminsRepository } from '@/repositories'
import { DeleteAdminsService } from '@/services/admins'
import { AdminEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const DeleteAdminsControllerFactory = (): DeleteAdminsController => {
  const model = mysqlSource.getRepository(AdminEntity)
  const repository = new AdminsRepository(model)
  const service = new DeleteAdminsService(repository)
  const controller = new DeleteAdminsController(service)
  return controller
}
