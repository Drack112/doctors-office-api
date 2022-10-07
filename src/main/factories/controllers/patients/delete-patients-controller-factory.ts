import { DeletePatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/infra/repositories'
import { DeletePatientsService } from '@/services/patients'
import { PatientEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const DeletePatientsControllerFactory = (): DeletePatientsController => {
  const model = mysqlSource.getRepository(PatientEntity)
  const repository = new PatientsRepository(model)
  const service = new DeletePatientsService(repository)
  const controller = new DeletePatientsController(service)
  return controller
}
