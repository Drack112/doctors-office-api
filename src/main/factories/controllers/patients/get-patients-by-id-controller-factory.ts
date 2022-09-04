import { GetPatientsByIdController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/repositories'
import { GetPatientsByIdService } from '@/services/patients'
import { PatientEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetPatientsByIdControllerFactory = (): GetPatientsByIdController => {
  const model = mysqlSource.getRepository(PatientEntity)
  const repository = new PatientsRepository(model)
  const service = new GetPatientsByIdService(repository)
  const controller = new GetPatientsByIdController(service)
  return controller
}
