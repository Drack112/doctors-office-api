import { UpdatePatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/repositories'
import { UpdatePatientsService } from '@/services/patients'

export const UpdatePatientsControllerFactory = (): UpdatePatientsController => {
  const repository = new PatientsRepository()
  const service = new UpdatePatientsService(repository)
  const controller = new UpdatePatientsController(service)
  return controller
}
