import { DeletePatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/repositories'
import { DeletePatientsService } from '@/services/patients'

export const DeletePatientsControllerFactory = (): DeletePatientsController => {
  const repository = new PatientsRepository()
  const service = new DeletePatientsService(repository)
  const controller = new DeletePatientsController(service)
  return controller
}
