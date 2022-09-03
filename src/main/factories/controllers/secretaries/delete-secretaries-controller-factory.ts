import { DeleteSecretariesController } from '@/main/controllers'
import { SecretariesRepository } from '@/repositories'
import { DeleteSecretariesService } from '@/services/secretaries'

export const DeleteSecretariesControllerFactory = (): DeleteSecretariesController => {
  const repository = new SecretariesRepository()
  const service = new DeleteSecretariesService(repository)
  const controller = new DeleteSecretariesController(service)
  return controller
}
