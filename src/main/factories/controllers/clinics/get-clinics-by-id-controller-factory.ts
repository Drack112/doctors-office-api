import { GetClinicsByIdController } from '@/main/controllers/clinics'
import { ClinicsRepository } from '@/infra/repositories'
import { GetClinicsByIdService } from '@/services/clinics'
import { ClinicEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const GetClinicsByIdControllerFactory = (): GetClinicsByIdController => {
  const model = mysqlSource.getRepository(ClinicEntity)
  const repository = new ClinicsRepository(model)
  const service = new GetClinicsByIdService(repository)
  const controller = new GetClinicsByIdController(service)
  return controller
}
