import { GetSecretariesByClinicController } from '@/main/controllers/secretaries'
import { UsersClinicsRepository } from '@/infra/repositories'
import { GetSecretariesByClinicService } from '@/services/secretaries'
import { UserClinicEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const GetSecretariesByClinicControllerFactory = (): GetSecretariesByClinicController => {
  const model = mysqlSource.getRepository(UserClinicEntity)
  const repository = new UsersClinicsRepository(model)
  const service = new GetSecretariesByClinicService(repository)
  const controller = new GetSecretariesByClinicController(service)
  return controller
}
