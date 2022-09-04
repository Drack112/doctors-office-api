import { UpdatePatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/repositories'
import { PatientEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { UpdatePatientsService } from '@/services/patients'

export const UpdatePatientsControllerFactory = (): UpdatePatientsController => {
  const model = mysqlSource.getRepository(PatientEntity)
  const repository = new PatientsRepository(model)
  const service = new UpdatePatientsService(repository)
  const controller = new UpdatePatientsController(service)
  return controller
}
