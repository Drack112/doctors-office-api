import { DeleteSecretariesController } from '@/main/controllers/secretaries'
import { SecretariesRepository } from '@/repositories'
import { DeleteSecretariesService } from '@/services/secretaries'
import { SecretaryEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const DeleteSecretariesControllerFactory = (): DeleteSecretariesController => {
  const model = mysqlSource.getRepository(SecretaryEntity)
  const repository = new SecretariesRepository(model)
  const service = new DeleteSecretariesService(repository)
  const controller = new DeleteSecretariesController(service)
  return controller
}
