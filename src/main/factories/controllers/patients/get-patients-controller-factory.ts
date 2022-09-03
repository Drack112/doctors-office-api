import { GetPatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/repositories'
import { GetPatientsService } from '@/services/patients'

export const GetPatientsControllerFactory = (): GetPatientsController => {
  const repository = new PatientsRepository()
  const service = new GetPatientsService(repository)
  const controller = new GetPatientsController(service)
  return controller
}
