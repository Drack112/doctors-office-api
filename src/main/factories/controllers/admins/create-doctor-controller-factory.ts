import { CreateAdminsController } from '@/main/controllers/admins'
import { AdminsRepository } from '@/repositories'
import { AdminEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { CreateAdminsService } from '@/services/admins'

export const CreateAdminsControllerFactory = (): CreateAdminsController => {
  const model = mysqlSource.getRepository(AdminEntity)
  const repository = new AdminsRepository(model)
  const service = new CreateAdminsService(repository)
  const controller = new CreateAdminsController(service)
  return controller
}
