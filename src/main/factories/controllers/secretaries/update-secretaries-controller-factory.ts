import { UpdateSecretariesController } from '@/main/controllers/secretaries'
import { SecretariesRepository } from '@/repositories'
import { UpdateSecretariesService } from '@/services/secretaries'
import { SecretaryEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const UpdateSecretariesControllerFactory = (): UpdateSecretariesController => {
  const model = mysqlSource.getRepository(SecretaryEntity)
  const repository = new SecretariesRepository(model)
  const service = new UpdateSecretariesService(repository)
  const controller = new UpdateSecretariesController(service)
  return controller
}
