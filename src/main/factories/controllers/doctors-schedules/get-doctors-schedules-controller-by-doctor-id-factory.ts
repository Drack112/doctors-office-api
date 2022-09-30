import { GetDoctorsSchedulesByDoctorIdController } from '@/main/controllers/doctors-schedules'
import { DoctorsRepository, DoctorsSchedulesRepository } from '@/repositories'
import { DoctorEntity, DoctorScheduleEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { GetDoctorsSchedulesByDoctorIdService } from '@/services/doctors-schedules'

export const GetDoctorsSchedulesByDoctorIdControllerFactory = (): GetDoctorsSchedulesByDoctorIdController => {
  const doctorsSchedulesModel = mysqlSource.getRepository(DoctorScheduleEntity)
  const doctorsSchedulesRepository = new DoctorsSchedulesRepository(doctorsSchedulesModel)
  const doctorsModel = mysqlSource.getRepository(DoctorEntity)
  const doctorsRepository = new DoctorsRepository(doctorsModel)
  const service = new GetDoctorsSchedulesByDoctorIdService(doctorsSchedulesRepository, doctorsRepository)
  const controller = new GetDoctorsSchedulesByDoctorIdController(service)
  return controller
}
