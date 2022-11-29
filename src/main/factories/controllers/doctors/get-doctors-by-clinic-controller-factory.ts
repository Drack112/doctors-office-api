import { GetDoctorsByClinicController } from '@/main/controllers/doctors'
import { UsersClinicsRepository } from '@/infra/repositories'
import { GetDoctorsByClinicService } from '@/services/doctors'
import { UserClinicEntity } from '@/infra/entities'
import { mysqlSource } from '@/infra/mysql-connection'

export const GetDoctorsByClinicControllerFactory = (): GetDoctorsByClinicController => {
  const model = mysqlSource.getRepository(UserClinicEntity)
  const repository = new UsersClinicsRepository(model)
  const service = new GetDoctorsByClinicService(repository)
  const controller = new GetDoctorsByClinicController(service)
  return controller
}
