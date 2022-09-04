import { GetPatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/repositories'
import { GetPatientsService } from '@/services/patients'
import { PatientEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetPatientsControllerFactory = (): GetPatientsController => {
  const model = mysqlSource.getRepository(PatientEntity)
  const repository = new PatientsRepository(model)
  const service = new GetPatientsService(repository)
  const controller = new GetPatientsController(service)
  return controller
}
