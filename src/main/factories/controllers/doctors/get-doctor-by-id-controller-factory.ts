import { GetDoctorByIdController } from '@/main/controllers'
import { DoctorsRepository } from '@/repositories'
import { GetDoctorsByIdService } from '@/services'

export const GetDoctorByIdControllerFactory = (): GetDoctorByIdController => {
  const repository = new DoctorsRepository()
  const service = new GetDoctorsByIdService(repository)
  const controller = new GetDoctorByIdController(service)
  return controller
}
