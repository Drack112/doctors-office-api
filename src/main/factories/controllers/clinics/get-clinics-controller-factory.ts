import { GetClinicsController } from '@/main/controllers/clinics'
import { ClinicsRepository } from '@/repositories'
import { GetClinicsService } from '@/services/clinics'
import { ClinicEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetClinicsControllerFactory = (): GetClinicsController => {
  const model = mysqlSource.getRepository(ClinicEntity)
  const repository = new ClinicsRepository(model)
  const service = new GetClinicsService(repository)
  const controller = new GetClinicsController(service)
  return controller
}
