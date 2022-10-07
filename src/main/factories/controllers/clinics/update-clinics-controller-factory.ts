import { UpdateClinicsController } from '@/main/controllers/clinics'
import { ClinicsRepository } from '@/infra/repositories'
import { UpdateClinicsService } from '@/services/clinics'
import { ClinicEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const UpdateClinicsControllerFactory = (): UpdateClinicsController => {
  const model = mysqlSource.getRepository(ClinicEntity)
  const repository = new ClinicsRepository(model)
  const service = new UpdateClinicsService(repository)
  const controller = new UpdateClinicsController(service)
  return controller
}
