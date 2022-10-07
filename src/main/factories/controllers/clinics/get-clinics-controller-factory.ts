import { GetClinicsController } from '@/main/controllers/clinics'
import { ClinicsRepository } from '@/infra/repositories'
import { GetClinicsService } from '@/services/clinics'
import { ClinicEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const GetClinicsControllerFactory = (): GetClinicsController => {
  const model = mysqlSource.getRepository(ClinicEntity)
  const repository = new ClinicsRepository(model)
  const service = new GetClinicsService(repository)
  const controller = new GetClinicsController(service)
  return controller
}
