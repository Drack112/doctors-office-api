import { CreateClinicsController } from '@/main/controllers/clinics'
import { ClinicsRepository } from '@/repositories'
import { ClinicEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { CreateClinicsService } from '@/services/clinics'

export const CreateClinicsControllerFactory = (): CreateClinicsController => {
  const model = mysqlSource.getRepository(ClinicEntity)
  const repository = new ClinicsRepository(model)
  const service = new CreateClinicsService(repository)
  const controller = new CreateClinicsController(service)
  return controller
}
