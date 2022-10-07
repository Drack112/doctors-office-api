import { UpdatePatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/infra/repositories'
import { PatientEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'
import { UpdatePatientsService } from '@/services/patients'

export const UpdatePatientsControllerFactory = (): UpdatePatientsController => {
  const model = mysqlSource.getRepository(PatientEntity)
  const repository = new PatientsRepository(model)
  const service = new UpdatePatientsService(repository)
  const controller = new UpdatePatientsController(service)
  return controller
}
