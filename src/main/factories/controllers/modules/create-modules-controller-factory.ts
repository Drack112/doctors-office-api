import { CreateModulesController } from '@/main/controllers/modules'
import { ModulesRepository } from '@/infra/repositories'
import { ModuleEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { CreateModulesService } from '@/services/modules'

export const CreateModulesControllerFactory = (): CreateModulesController => {
  const model = mysqlSource.getRepository(ModuleEntity)
  const repository = new ModulesRepository(model)
  const service = new CreateModulesService(repository)
  const controller = new CreateModulesController(service)
  return controller
}
