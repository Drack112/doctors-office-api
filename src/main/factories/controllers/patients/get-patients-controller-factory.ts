import { GetPatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/infra/repositories'
import { GetPatientsService } from '@/services/patients'
import { PatientEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const GetPatientsControllerFactory = (): GetPatientsController => {
  const model = mysqlSource.getRepository(PatientEntity)
  const repository = new PatientsRepository(model)
  const service = new GetPatientsService(repository)
  const controller = new GetPatientsController(service)
  return controller
}
