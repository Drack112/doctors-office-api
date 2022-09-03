import { UpdateSecretariesController } from '@/main/controllers'
import { SecretariesRepository } from '@/repositories'
import { UpdateSecretariesService } from '@/services/secretaries'

export const UpdateSecretariesControllerFactory = (): UpdateSecretariesController => {
  const repository = new SecretariesRepository()
  const service = new UpdateSecretariesService(repository)
  const controller = new UpdateSecretariesController(service)
  return controller
}
