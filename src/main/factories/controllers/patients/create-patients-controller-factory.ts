import { CreatePatientsController } from '@/main/controllers/patients'
import { PatientsRepository } from '@/repositories'
import { CreatePatientsService } from '@/services/patients'

export const CreatePatientsControllerFactory = (): CreatePatientsController => {
  const repository = new PatientsRepository()
  const service = new CreatePatientsService(repository)
  const controller = new CreatePatientsController(service)
  return controller
}
