import { DeleteClinicsController } from '@/main/controllers/clinics'
import { ClinicsRepository } from '@/repositories'
import { DeleteClinicsService } from '@/services/clinics'
import { ClinicEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const DeleteClinicsControllerFactory = (): DeleteClinicsController => {
  const model = mysqlSource.getRepository(ClinicEntity)
  const repository = new ClinicsRepository(model)
  const service = new DeleteClinicsService(repository)
  const controller = new DeleteClinicsController(service)
  return controller
}
