import { GetClinicsByIdController } from '@/main/controllers/clinics'
import { ClinicsRepository } from '@/repositories'
import { GetClinicsByIdService } from '@/services/clinics'
import { ClinicEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetClinicsByIdControllerFactory = (): GetClinicsByIdController => {
  const model = mysqlSource.getRepository(ClinicEntity)
  const repository = new ClinicsRepository(model)
  const service = new GetClinicsByIdService(repository)
  const controller = new GetClinicsByIdController(service)
  return controller
}
