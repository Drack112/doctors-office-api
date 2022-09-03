import { GetSecretariesByIdController } from '@/main/controllers'
import { SecretariesRepository } from '@/repositories'
import { GetSecretariesByIdService } from '@/services/secretaries'

export const GetSecretariesByIdControllerFactory = (): GetSecretariesByIdController => {
  const repository = new SecretariesRepository()
  const service = new GetSecretariesByIdService(repository)
  const controller = new GetSecretariesByIdController(service)
  return controller
}
