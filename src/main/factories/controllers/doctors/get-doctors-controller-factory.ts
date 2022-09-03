import { GetDoctorsController } from '@/main/controllers'
import { DoctorsRepository } from '@/repositories'
import { GetDoctorsService } from '@/services'

export const GetDoctorsControllerFactory = (): GetDoctorsController => {
  const repository = new DoctorsRepository()
  const service = new GetDoctorsService(repository)
  const controller = new GetDoctorsController(service)
  return controller
}
