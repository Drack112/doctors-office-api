import { UpdateDoctorController } from '@/main/controllers/doctors'
import { DoctorsRepository } from '@/repositories'
import { UpdateDoctorService } from '@/services/doctors'
import { DoctorEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const UpdateDoctorControllerFactory = (): UpdateDoctorController => {
  const model = mysqlSource.getRepository(DoctorEntity)
  const repository = new DoctorsRepository(model)
  const service = new UpdateDoctorService(repository)
  const controller = new UpdateDoctorController(service)
  return controller
}
