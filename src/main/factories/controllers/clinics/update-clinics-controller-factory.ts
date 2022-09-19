import { UpdateClinicsController } from '@/main/controllers/clinics'
import { ClinicsRepository } from '@/repositories'
import { UpdateClinicsService } from '@/services/clinics'
import { ClinicEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const UpdateClinicsControllerFactory = (): UpdateClinicsController => {
  const model = mysqlSource.getRepository(ClinicEntity)
  const repository = new ClinicsRepository(model)
  const service = new UpdateClinicsService(repository)
  const controller = new UpdateClinicsController(service)
  return controller
}
