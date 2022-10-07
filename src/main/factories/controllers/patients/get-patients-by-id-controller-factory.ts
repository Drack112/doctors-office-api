import { GetPatientsByIdController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/infra/repositories'
import { GetPatientsByIdService } from '@/services/patients'
import { PatientEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const GetPatientsByIdControllerFactory = (): GetPatientsByIdController => {
  const model = mysqlSource.getRepository(PatientEntity)
  const repository = new PatientsRepository(model)
  const service = new GetPatientsByIdService(repository)
  const controller = new GetPatientsByIdController(service)
  return controller
}
