import { GetSecretariesController } from '@/main/controllers'
import { SecretariesRepository } from '@/repositories'
import { GetSecretariesService } from '@/services/secretaries'
import { SecretaryEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetSecretariesControllerFactory = (): GetSecretariesController => {
  const model = mysqlSource.getRepository(SecretaryEntity)
  const repository = new SecretariesRepository(model)
  const service = new GetSecretariesService(repository)
  const controller = new GetSecretariesController(service)
  return controller
}
