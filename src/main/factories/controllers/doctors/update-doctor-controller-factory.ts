import { UpdateDoctorController } from '@/main/controllers'
import { DoctorsRepository } from '@/repositories'
import { UpdateDoctorService } from '@/services/doctors'

export const UpdateDoctorControllerFactory = (): UpdateDoctorController => {
  const repository = new DoctorsRepository()
  const service = new UpdateDoctorService(repository)
  const controller = new UpdateDoctorController(service)
  return controller
}
