import { DeleteClinicsController } from '@/main/controllers/clinics'
import { ClinicsRepository } from '@/infra/repositories'
import { DeleteClinicsService } from '@/services/clinics'
import { ClinicEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const DeleteClinicsControllerFactory = (): DeleteClinicsController => {
  const model = mysqlSource.getRepository(ClinicEntity)
  const repository = new ClinicsRepository(model)
  const service = new DeleteClinicsService(repository)
  const controller = new DeleteClinicsController(service)
  return controller
}
