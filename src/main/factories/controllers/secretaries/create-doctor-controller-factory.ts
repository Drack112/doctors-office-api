import { CreateSecretariesController } from '@/main/controllers'
import { SecretariesRepository } from '@/repositories'
import { CreateSecretariesService } from '@/services/secretaries'

export const CreateSecretariesControllerFactory = (): CreateSecretariesController => {
  const repository = new SecretariesRepository()
  const service = new CreateSecretariesService(repository)
  const controller = new CreateSecretariesController(service)
  return controller
}
