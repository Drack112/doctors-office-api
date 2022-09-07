import { DeleteDoctorController } from '@/main/controllers/doctors'
import { DoctorsRepository } from '@/repositories'
import { DeleteDoctorService } from '@/services/doctors'
import { DoctorEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const DeleteDoctorControllerFactory = (): DeleteDoctorController => {
  const model = mysqlSource.getRepository(DoctorEntity)
  const repository = new DoctorsRepository(model)
  const service = new DeleteDoctorService(repository)
  const controller = new DeleteDoctorController(service)
  return controller
}
