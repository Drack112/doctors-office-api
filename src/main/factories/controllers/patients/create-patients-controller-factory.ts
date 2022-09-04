import { CreatePatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/repositories'
import { CreatePatientsService } from '@/services/patients'
import { PatientEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const CreatePatientsControllerFactory = (): CreatePatientsController => {
  const model = mysqlSource.getRepository(PatientEntity)
  const repository = new PatientsRepository(model)
  const service = new CreatePatientsService(repository)
  const controller = new CreatePatientsController(service)
  return controller
}
