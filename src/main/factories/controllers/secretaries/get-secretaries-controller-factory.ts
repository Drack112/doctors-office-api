import { GetSecretariesController } from '@/main/controllers'
import { SecretariesRepository } from '@/repositories'
import { GetSecretariesService } from '@/services/secretaries'

export const GetSecretariesControllerFactory = (): GetSecretariesController => {
  const repository = new SecretariesRepository()
  const service = new GetSecretariesService(repository)
  const controller = new GetSecretariesController(service)
  return controller
}
