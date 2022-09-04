import { CreateSecretariesController } from '@/main/controllers'
import { SecretariesRepository } from '@/repositories'
import { CreateSecretariesService } from '@/services/secretaries'
import { SecretaryEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const CreateSecretariesControllerFactory = (): CreateSecretariesController => {
  const model = mysqlSource.getRepository(SecretaryEntity)
  const repository = new SecretariesRepository(model)
  const service = new CreateSecretariesService(repository)
  const controller = new CreateSecretariesController(service)
  return controller
}
