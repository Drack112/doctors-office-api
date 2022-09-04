import { DeletePatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/repositories'
import { DeletePatientsService } from '@/services/patients'
import { PatientEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const DeletePatientsControllerFactory = (): DeletePatientsController => {
  const model = mysqlSource.getRepository(PatientEntity)
  const repository = new PatientsRepository(model)
  const service = new DeletePatientsService(repository)
  const controller = new DeletePatientsController(service)
  return controller
}
