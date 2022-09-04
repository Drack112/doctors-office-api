import { GetDoctorsController } from '@/main/controllers'
import { DoctorsRepository } from '@/repositories'
import { GetDoctorsService } from '@/services/doctors'
import { DoctorEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetDoctorsControllerFactory = (): GetDoctorsController => {
  const model = mysqlSource.getRepository(DoctorEntity)
  const repository = new DoctorsRepository(model)
  const service = new GetDoctorsService(repository)
  const controller = new GetDoctorsController(service)
  return controller
}
