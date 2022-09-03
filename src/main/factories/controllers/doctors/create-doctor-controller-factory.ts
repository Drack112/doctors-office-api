import { CreateDoctorController } from '@/main/controllers'
import { DoctorsRepository } from '@/repositories'
import { CreateDoctorService } from '@/services/doctors'

export const CreateDoctorControllerFactory = (): CreateDoctorController => {
  const repository = new DoctorsRepository()
  const service = new CreateDoctorService(repository)
  const controller = new CreateDoctorController(service)
  return controller
}
