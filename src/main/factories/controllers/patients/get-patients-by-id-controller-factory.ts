import { GetPatientsByIdController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/repositories'
import { GetPatientsByIdService } from '@/services/patients'

export const GetPatientsByIdControllerFactory = (): GetPatientsByIdController => {
  const repository = new PatientsRepository()
  const service = new GetPatientsByIdService(repository)
  const controller = new GetPatientsByIdController(service)
  return controller
}
