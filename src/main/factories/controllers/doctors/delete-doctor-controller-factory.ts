import { DeleteDoctorController } from '@/main/controllers'
import { DoctorsRepository } from '@/repositories'
import { DeleteDoctorService } from '@/services'

export const DeleteDoctorControllerFactory = (): DeleteDoctorController => {
  const repository = new DoctorsRepository()
  const service = new DeleteDoctorService(repository)
  const controller = new DeleteDoctorController(service)
  return controller
}
