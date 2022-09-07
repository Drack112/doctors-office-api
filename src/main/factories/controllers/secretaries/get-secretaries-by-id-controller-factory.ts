import { GetSecretariesByIdController } from '@/main/controllers/secretaries'
import { SecretariesRepository } from '@/repositories'
import { GetSecretariesByIdService } from '@/services/secretaries'
import { SecretaryEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetSecretariesByIdControllerFactory = (): GetSecretariesByIdController => {
  const model = mysqlSource.getRepository(SecretaryEntity)
  const repository = new SecretariesRepository(model)
  const service = new GetSecretariesByIdService(repository)
  const controller = new GetSecretariesByIdController(service)
  return controller
}
