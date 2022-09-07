import { GetDoctorByIdController } from '@/main/controllers/doctors'
import { DoctorsRepository } from '@/repositories'
import { GetDoctorsByIdService } from '@/services/doctors'
import { DoctorEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'

export const GetDoctorByIdControllerFactory = (): GetDoctorByIdController => {
  const model = mysqlSource.getRepository(DoctorEntity)
  const repository = new DoctorsRepository(model)
  const service = new GetDoctorsByIdService(repository)
  const controller = new GetDoctorByIdController(service)
  return controller
}
