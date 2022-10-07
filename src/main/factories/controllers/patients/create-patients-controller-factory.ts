import { CreatePatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/infra/repositories'
import { CreatePatientsService } from '@/services/patients'
import { PatientEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const CreatePatientsControllerFactory = (): CreatePatientsController => {
  const model = mysqlSource.getRepository(PatientEntity)
  const repository = new PatientsRepository(model)
  const service = new CreatePatientsService(repository)
  const controller = new CreatePatientsController(service)
  return controller
}
