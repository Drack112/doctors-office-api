import { CreateDoctorsSchedulesController } from '@/main/controllers/doctors-schedules'
import { DoctorsSchedulesRepository } from '@/repositories'
import { DoctorScheduleEntity } from '@/repositories/entities'
import { mysqlSource } from '@/repositories/mysql-connection'
import { CreateDoctorsSchedulesService } from '@/services/doctors-schedules'

export const CreateDoctorsSchedulesControllerFactory = (): CreateDoctorsSchedulesController => {
  const model = mysqlSource.getRepository(DoctorScheduleEntity)
  const repository = new DoctorsSchedulesRepository(model)
  const service = new CreateDoctorsSchedulesService(repository)
  const controller = new CreateDoctorsSchedulesController(service)
  return controller
}
