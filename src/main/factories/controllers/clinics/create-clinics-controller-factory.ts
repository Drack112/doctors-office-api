import { CreateClinicsController } from '@/main/controllers/clinics'
import { ClinicsRepository, UsersClinicsRepository } from '@/infra/repositories'
import { ClinicEntity, UserClinicEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { CreateClinicsService } from '@/services/clinics'

export const CreateClinicsControllerFactory = (): CreateClinicsController => {
  const model = mysqlSource.getRepository(ClinicEntity)
  const repository = new ClinicsRepository(model)
  const userClinicModel = mysqlSource.getRepository(UserClinicEntity)
  const userClinicRepository = new UsersClinicsRepository(userClinicModel)
  const service = new CreateClinicsService(repository, userClinicRepository)
  const controller = new CreateClinicsController(service)
  return controller
}
