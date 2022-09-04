import { CreateDoctorController } from '@/main/controllers'
import { DoctorsRepository } from '@/repositories'
import { DoctorEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { CreateDoctorService } from '@/services/doctors'

export const CreateDoctorControllerFactory = (): CreateDoctorController => {
  const model = mysqlSource.getRepository(DoctorEntity)
  const repository = new DoctorsRepository(model)
  const service = new CreateDoctorService(repository)
  const controller = new CreateDoctorController(service)
  return controller
}
